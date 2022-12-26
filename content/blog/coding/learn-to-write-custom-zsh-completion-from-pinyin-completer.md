---
title: "从实现文件的拼音Tab补全来学习zsh的补全系统"
date: 2022-05-23T21:19:06+08:00
draft: true
---

最近对各种终端玩意感兴趣，突发奇想想折腾一个zsh的拼音Tab补全，于是就着这个机会浅浅学习了一下zsh的补全系统。

## 为什么造新轮子？
简单搜索一下互联网，我找到了以下两个前人已经写好的拼音Tab补全方案：

| [@petronny](https://github.com/petronny/pinyin-completion) | [@leoleoasd](https://gist.github.com/leoleoasd/8f63b0c8af0ce96157f989340ad70bfa) |
| --- | --- |
| python2 | python2 |
| Hardcode 汉字拼音 | 使用[`pypinyin`](https://github.com/mozillazg/python-pinyin)库 |
| 附带全角符号转半角 | 无 |
| 只能匹配音序 | 可以匹配音序和全拼 |
| 可以附加声调 | 不可以附加声调 |

除了 Python2 本身比较古老之外，两者的功能也不尽相同。同时搜索之后发现 [`pypinyin`](https://github.com/mozillazg/python-pinyin) 库的作者还写了 [Go](https://github.com/mozillazg/go-pinyin) 和 [Rust](https://github.com/mozillazg/rust-pinyin) 的版本。如果用他们代替Python速度会不会有提升呢？（希望会吧……）

但是最重要的一点还是：**我用的是双拼**！请问这个世界能不能对双拼用户友好一点？

## 结构分析
诶聪明的同学可能会问了，不是zsh吗，怎么就Python了？不急，先把这两个项目都嫖到本地，然后我们来分析一下它们的结构。

可以看到，和zsh交互的部分大同小异，都是这么一段代码：
```zsh
function _pinyin_comp()
{
local IFS=$'\n'
reply = ($(~/.oh-my-zsh/pinyin-test 0 $*))
echo reply
}

zstyle ':completion:*' user-expand _pinyin_comp
zstyle ':completion:*:user-expand:*' tag-order '!original'
zstyle ':completion:*' completer _oldlist _expand _force_rehash _complete _match _user_expand
```

看到这里大概的思路就明确了：他们都会启动一个Python程序负责真正的拼音计算和匹配，然后把这个匹配程序包一层shell的外壳（shell的shell？外壳的shell？外壳的外壳？）注册到zsh的补全系统里面去。

## zstyle配置
我们从下面几行`zstyle`开始。[The Vulnerable Dev的这篇文章](https://thevaluable.dev/zsh-completion-guide-examples/) 很清晰地概览了zsh补全系统的晦涩语法，同时 `man zshcompsys` 能看到官方关于补全系统的文档。

我们首先要理解`zstyle`，它不止可以配置关于UI显示的“style”，很多zsh的行为风格也可以由他配置。它的语法是

```zsh
zstyle <context> <style> <values> [<more values> <even more> ...]
```

其中style和values就是设置项的名称和值了，注意value可以为列表值，用空格隔开（即：array style）。而context是这一行设置的scope。跟补全相关的配置，其语法为

```
:completion:<function>:<completer>:<command>:<argument>:<tag>
```

上述值的定义我不一一罗列了，有兴趣的可以参考上文。也就是说我们如果只想给 `cp` 命令（command）的后面配置额外的补全，可以写 `:completion:*:*:cp:*:*`。但是由于通配符`*`可以匹配冒号，所以这一条pattern也等价于`:completion:*:cp:*`。

`zstyle ':completion:*' user-expand _pinyin_comp`

根据 man，`user-expand` 是一个array style，每一个value都是一个以 `_` 开头的function（或 `$hash`，此处不讨论），用来定义用户自己的“expand”行为——即按Tab键触发的“命令展开”规则。所以 `zstyle ':completion:*' user-expand _pinyin_comp` 这一行就是将 `_pinyin_comp` 这个用 Python 实现的展开算法注册到了用户自定义的展开规则中。

`zstyle ':completion:*' completer ... _user_expand`

当用户按下 Tab 的时候，除了“展开”，zsh 还会尝试很多其他的行为。例如默认的 `_complete`、智能修改当前单词的 `_approximate` 和 `_correct`、将 alias 替换为定义的 `_expand_alias` 等等。这些都叫 completer，即提供“补全”功能的功能控件，并且都以下划线开头。大家可能好奇我的 zsh 好像没这么聪明啊？其实 man 也告诉我们了：zsh 默认只开启 `_complete _ignored` 这两个 completer。其他的 completer，包括 `_user_expand`，都是没有开启的，也就是说光把 `_pinyin_comp` 注册到 `user-expand` 里面还不够，还需要整个开启 `_user_expand` 的功能。这就是最后一行 `zstyle ':completion:*' completer ... _user_expand` 的用处了。由于 completer 是有先后顺序的，所以把 `_user_expand` 放在最后是一个比较稳妥的选择：这样一来只有前面的 completer 没有匹配到的时候才会交给咱们自定义的补全。
至于前面几个 completer 分别干了啥，这篇文章暂时不讨论，但这也意味着**这两个插件其实都会帮用户自作主张开启一些额外的 Tab 补全行为**。

`zstyle ':completion:*:user-expand:*' tag-order '!original'`

至于这一行，首先它是对 `_user_expand` 这个 completer 的配置。（**注：根据 man 文档，context中声明 completer 的时候，要把开头的下划线删除、后面的下划线变成连字符。所以声明 `_user_expand` 这个 completer 的 context 写的是 `user-expand`。这有别于第一行 `zstyle` 中的 `user-expand`，它是一个 style（配置项名字），是和 `_user_expand` 这个 completer 搭配使用的。**）

> `:completion:function:completer:command:argument:tag` 
> ...
> The *completer* currently active, the name of the function without the leading underscore and with other underscores converted to hyphens.

其次 zsh 的所有补全建议是有分类的，这个分类就是“tag”（标签），比如外部命令（external command）、shell 函数（shell function）、文件和路径（file or directory）等等。对于 `_expand` 和 `_user_expand` 这两个 completers 触发的补全，有 original、expansions 和 all expansions 三个标签，分别代表原单词、单一可能性的展开、所有可能的展开（如有多个）。

> all-expansions
> used by the `_expand` completer when adding the single string containing all possible expansions
> 
> expansions
> used by the `_expand` completer for individual words (as opposed to the complete set of expansions) resulting from the expansion of a word on the command line
> 
> original
> used by the `_approximate`, `_correct` and `_expand` completers when offering the original string as a match

所以 `tag-order` 这个配置，可以给所有补全建议按照标签进行补全和过滤。这里就是忽略原单词（你都到 `_user_expand` 这一步了，按 Tab 想必就是当作拼音来补全了，就不考虑你按 Tab 但其实不想展开替换的情况了。）

## 补全函数的定义
根据 man 文档，注册为 user expand 的函数名必须以下划线开头（`_pinyin_comp`）。这个函数的返回值不重要，重要的是设置一个 `reply` 变量作为补全候选列表。可选再设置一个 `REPLY` 变量作为说明。

>If the word is to be expanded, the function should set the array reply to a list of expansions. Optionally, it can set REPLY to a word that will be used as a description for the set of expansions.  The return status of the function is irrelevant.

这个 python 程序本身本文不多赘述，稍微把玩一下就能发现，它就是接受一个用户输入的待补全拼音，然后遍历当前路径的文件名，把每一个文件名的拼音计算出来并且和输入做比较，过滤出来能匹配的子集。至于 zsh 函数内的其他两行，只是把所有匹配的文件夹打印在一行罢了（感觉挺多余）。

## 造自己的补全函数