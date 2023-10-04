---
title: "我的 LaTeX 英文学术论文写作贴士"
date: 2023-10-04T23:45:42+08:00
lang: zh-cn
tags:
    - latex
---

本文我会介绍关于在 LaTeX 中*多人协同*编写英文学术论文的一些贴士。除了讨论 LaTeX 本身，*多人协同*也是本文的另一条暗线。
<!--more-->
我会以 ACM（计算机科学领域最大的协会之一）为例，但许多建议也适用于不同领域和学术模板。

## 词间空格和句间空格

在LaTeX中，句子之间的空格要略宽于单词之间的空格。检测句间的空格的规则非常直白：首先空格必须跟在句号后面（或其他表示句子结束的标点，如感叹号和问号），其次这个句号跟在小写字母后面。如果空格没有跟在句号后面，或者句号前面的字母是大写的，则它是一个普通的单词间空格。例如：

> This work is done by A. Einstein.

在缩写名称当中，往往会有一个句号跟在大写字母的后面。所以这条规则总的来说还算适用。不过我们也有一些与该规律相反的情况：

> In 1997, Apple Inc. purchased a company called NeXT.

在这个例子中，"Inc."后面应该是一个词空格，"NeXT."后面才应该是一个句间空格。

为了解决这个问题，LaTeX有一个命令 `\@`，它是一个不可见（即，零宽度）的小写字母。正因为它并不可见，它只用于纠正涉及大小写的逻辑判断，而不影响总的文本内容。例如，上面的句子可以重写为：

```latex
In 1997, Apple Inc.\@ purchased a company called NeXT\@.
```

第一个 `\@` 写在句号后面，所以下一个空格觉得自己跟在两个小写字母中间，所以是一个词间空格。第二个 `\@` 写在句号前面，所以这个句子后面的空格觉得这里是"小写字母 → 句号 → 空格"的模式，即一个句间空格。

在这个例子中，第一个 `\@` 也可以用 `\ ` 命令（一个反斜杠和一个空格）替换。这个命令会强制输出一个词间空格，故编译器不需要做任何额外的逻辑判断来猜空格类别，用户也不会混淆 `\@.` 和 `.\@`。但缺点就是可读性比较低：人们很容易忽略反斜杠符号，然后误认为这里是一个普通的空格。（代码高亮也不会给你高亮空格吧！）假设你的同事或你自己以后回到这里改文章，一个不留意删除了空格但保留了反斜杠，那它就会吞掉下一个非字母符号或整个下一个单词了，进而导致编译错误或意外使用一些奇怪的命令。相反，坚持使用 `\@` 还可以"吓跑"那些没有很精通 LaTeX 的合作者。只要合作者自己没有犯糊涂，一般来讲看到这样一个陌生符号都会保持这附近的代码保持不变，只改改周围。这样此处空格的长度就不会误改了。

## 还有什么空格.……"不换行空格"?
在 LaTeX 中，还有另一种类型的空格：不换行空格。不换行空格用 `~` 表示（而不是 ` `）。顾名思义，引擎不会在不换行空格处插入换行。在学术写作中，最常见的用法是在 `\ref` 和 `\cite` 之前。例如，

```latex
Results in Section~\ref{section-label} are similar to previous findings~\cite{citation-key}.
```

## 连字符、连接号和破折号

在英语中有三种不同的“水平线”符号：连字符（-，即很多常用键盘上的“减号”）、连接号（–，macOS 可用 <kbd>option</kbd> + <kbd>-</kbd> 输入）和破折号（—，macOS 可用 <kbd>shift</kbd> + <kbd>option</kbd> + <kbd>-</kbd> 输入）。在 LaTeX 中，它们分别用 `-`、`--` 和 `---` 表示，因为 LaTeX 默认不支持直接使用 Unicode 字符。

在英语里——不考虑 LaTeX 数学模式下——连字符一般用于复合词（例如 `real-time`），连接号通常用于表示范围（例如 `8--10`），破折号则与中文破折号用法相同。

哦对了，在数学模式下当然我们还是用一个连字符（`-`）作为减号，可不要被我刚刚这段话搞混淆了！（不过在数学模式下，减号渲染出来的长度要比英文中的连字符长，这仅仅是为了保证数学排版的美观。）

## Caption 和 Label

我们可以在一些关键的位置用 `\label{...}` 声明一个自定义的内部代号，然后使用 `\ref{...}` 在文档的其他部分创建超链接导到之前声明的位置。为确保 `\ref{}` 超链接跳转到正确的位置，我们应该始终将 `\label` 紧放在被引用对象的后面。例如，

```latex
\section{Introduction}\label{sec:intro}

As mentioned in Section~\ref{sec:intro}
% This renders "Section 1",
% where 1 is the actual section number of Introduction,
% and 1 is clickable.
```

对于图标和插图，`\label{}` 应放在 `\caption{}` 之后。

\begin{table}
  \caption{...}\label{tab:awesome-table}
  \begin{tabular}{...}
  ...
  \end{tabular}
\end{table}
\begin{figure}
  \centering
  \includegraphics[]{}
  \caption{...}\label{fig:cool-figure}
\end{figure}

在上面的例子中我的 label 总是用一个“类型”标识起头的（`tab:`、`fig:`、`sec:`）。因为这样可以帮助我在后面快速回想起这些标签。网上很多其他的 LaTeX 教程里面也有出现类似的技巧。

顺便提一句，在 ACM 样式指南中，插图的 caption（当然也包括它的 label）应放在内容之后，而表格的 caption 应放在内容之前。其他社区可能有不同的写作风格指南，但在写作时一定要查阅一下。

## 表格中的水平线
如果要在表格中绘制水平线，最传统的做法就是 `\hline`，它可以出现在整个表格的最上方和最下方，以及表头与主体之间。另外 `\cline{i-j}` 还可以绘制一个指定开始与结束位置的水平线。但现在，一般大家会强烈建议作者导入 `booktabs` 这个包，然后使用里面的 `\toprule`、`\midrule`、`\bottomrule`和 `\cmidrule{i-j}` 代替 `\hline` 和 `\cline`。
替换之后你的 LaTeX 表格就大概长这样：
```latex
\usepackage{booktabs}
\begin{tabular}{...}
\toprule
... \\
\cmidrule{1-3}
... \\
\midrule
... \\
\bottomrule
\end{tabular}
```

相比起来，新方法最大的区别就是 `\toprule` 和 `\bottomrule` 会比 `\hline` 和 `\midrule` 更粗一些，然后所有新方法中的横线都会在上下添加更多的留白。想要定制的话也可以使用 `\heavyrulewidth` 和 `\lightrulewidth` 这两个预设的粗细值人，或者任意粗细数值，传到可选参数里面，例如 `\midrule[0.6em]`。虽然我没见到哪里有官方建议弃用和更换 `\hline` 和 `\cline`，但是基本上我遇到的所有提到 `booktabs` 的文章都强烈建议更换，给我感觉好像是“不要在C++里面用 `goto`” 等级的约定了，所以还是可以考虑在日后全盘换掉的。

如果用 ACM 模板的话，`booktabs` 包已经被导入进去了。如果用的是其他模板的话，可能需要参考他们社区的文档说明。

## 给模板已经导入的包追加可选参数

以 `xcolor` 为例，如果我们想使用这个包里面提供的一众起了名的预设颜色，我们需要在导入这个包的时候传入额外的可选参数，例如 `\usepackage[svgnames]{xcolor}`。但是 [ACM 模板](https://www.acm.org/publications/proceedings-template)已经在内部导入了 `xcolor` 这个包，并且它导入的时候没有传入任何可选参数。倘若我们在声明完 `\documentclass{acmart}` 之后再写一句 `\usepackage[svgnames]{xcolor}`，是没有任何用的。对于这种情况，唯一可行的替代方案是在**声明 `documentclass` 前** 写上这么一句 `\PassOptionsToPackage{svgnames}{xcolor}`。

## 关于表格的一些有用的包

如果我们用纯原生的 LaTeX 写表格，那它大概会长这样：
```latex
\begin{table}
  \caption{}\label{}
  \begin{tabular}{cllcp{2cm}...}
  ...
  \end{tabular}
\end{table}
```

然而这种表格自有它的局限性。如果我们要在某一列（或者某几列）当中写一长段话，我们只能为这一列使用 `p{length}` 来声明一个定值宽度，否则这一段话会一直向右延伸撑到出界也不会换行。为了防止我们手动精挑细选 `p` 列的宽度数值，我们可以使用 `tabularx` 包作为替代方案。如果使用这个包当中的 `tabularx` 环境代替 `tabular`，我们可以额外给整个表格声明一个总宽度，然后为其中的几列声明一个 `X` 类别，这样这几列就会自适应伸缩至平分总长当中剩下的所有宽度。
```latex
\begin{table}
  \caption{}\label{}
  \begin{tabularx}{\textwidth}{cXlcX...}
  ...
  \end{tabularx}
\end{table}
```

有时候我们也会写一个超级长的表格，长到需要换行的那种。除了手动分开创建好几个表格之外，我们还可以使用 `longtable` 包及其提供的同名环境，这样就只用写一个表格了，它会帮我们决定这个表格是否要换行，并且帮我们处理好换行的事情。关于该库的用法，可以自行搜索教程参考。除此之外，如果我们又想用 `longtable` 的换行功能、又想用 `tabularx` 的自适应宽度，有一个叫 `longtablex` 的库将两者合二为一了。但是这个库 ACM 模板并不提供官方支持。

有时候我们还想给表格内的文字添加脚注，此时我们会发现直接在表格里面写 `\footnote{}` 是*不会起作用*的。正确的做法是使用 `threeparttable` 包，它会额外在表格正文下面划出一片专用的脚注区域。除此之外，如果想同时用到 `threeparttable` 和 `longtable` 的功能，有一个叫 `threeparttablex` 的包。（**注意这个包不是 `threeparttable` 加 `tabularx`！**）但是这个包也没有 ACM 模板的官方支持。

最后，最近还有一个非常现代的表格包横空出世，叫 `tabularray`，它把上述所有的表格拓展功能一网打尽，同时还有更简化的语法，可以方便地对特定的行、列、单元格进行格式化，也可以更方便地合并单元格，颇有杀死比赛之势。我也已经[为它写过一篇博客文章]({{<ref "tables-in-latex-how-tabularray-tackles-the-pita-in-2023">}})。但是需要注意的是，因为它太新了，可能和出版商给的模板或者要求冲突。

## 给你的 LaTeX 合作者看这篇文章，不要给他们写 LaTeX 命令

在经历了诸多词 LaTeX 合作写作之后，我逐渐意识到让其他合作者学会我所了解到的 LaTeX 小技巧是很难的。有段时间我开始尝试为合作者们创建各种自定义 LaTeX 命令，想用这种方法确保他们写撰写的 LaTeX 片段也是完美无虞。比如我把 `figure` 和里面的 `includegraphics` 等调用打包成了一个快捷命令，以确保大家在正确的位置使用了居中、caption 和 label；或者把一些用词和标点定义成一个整个命令，确保它们都书写正确。然而后来我发现，有的时候这种方式反而比让大家直接写更难以管理。

举个例子，我曾经定义了一个 `\newcommand{\eg}{e.g.,}`，因为我想确保大家会在“e.g.”后面加逗号、两个字母之后各有一个句点、不加斜体等等，因为 ACM 采用 Chicago 写作风格，而后者有如此约定。后来我发现我的文档里面有**很多空格都被吃掉了**，因为有时候大家写的是 `\eg something` 而不是 `\eg{} something`。如果没有一个空大括号显式给这个命令传入空参数（即不传参数），那么即便当时声明这个命令不接受参数，它也会吞掉命令后面紧接的一个字符作为参数。（除非命令后面紧接的参数是一个标点符号，不是字母或空格，这时命令就不会吞掉该字符，并且接受空参数。）然后我发现，**硬要在每一次 `\eg` 后面加空括号 `{}` 真的比手写 `e.g.` 更麻烦**！所以我后来改成了 `\newcommand{\eg}{e.g.}`，并告诉合作者们“e.g. 后面要加逗号”这条规则，于是他们便可以写 `\eg, something`，加不加空括号都可以了；并且比起记住一个我自己定的“要加空括号”的规则，他们记住的是实打实的 Chicago style 写作风格规定。结果到了后来，我的文章中 `e.g.,` 比 `\eg,` 更多了，因为合作者们在参与其他人的文章中并没有 `\eg` 这条命令，同时连我自己每次用的时候都会犹豫这条命令当中有没有包含逗号。所以兜了这么大一个圈子，我本可以直接教育合作者们好好写纯文本，告诉他们写作时的标点规范。

总的来说，在 LaTeX 当中，命令定义和我们实际写作时的光标位置差的是在太远，并且 LaTeX 语言本身的性质决定了它不可能有“跳转到命令定义”这样的代码编辑器功能。如果单单是为了组合字词标点和简单逻辑而自创一些过于简单的命令，很可能没办法让合作者们注意到或者铭记于心。有的甚至会产生一些难以察觉到的副作用（比如吃掉了几个空格）。所以总的来说，我们最好是在合作写作的初期就召集所有合作者，过一遍 LaTeX 所有的技巧和坑，然后让大家都好好写，最后我们再用最朴素的全局文字搜索替换来检查代码中出现的常见错误。

## 参考

- [The ACM Publishing System (TAPS) List of Accepted LaTeX Packages](https://www.acm.org/publications/taps/whitelist-of-latex-packages)
- [What is the proper use of \@ (i.e., backslash-at)?](https://tex.stackexchange.com/questions/22561/what-is-the-proper-use-of-i-e-backslash-at)