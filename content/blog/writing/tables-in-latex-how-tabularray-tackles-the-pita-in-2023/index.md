---
title: "让人抓狂的 LaTeX 表格，以及 2023 年一劳永逸的 tabularray 宏包"
date: 2023-01-13T22:38:52+08:00
lang: zh-cn
tags:
    - latex
summary: >
    在 LaTeX 里面写表格一直非常令人头大：基础的表格不够用，CTAN 里面增强表格功能的宏包五花八门，网上搜索到的教程也各显神通。
    最近我发现了一个叫 `tabularray` 的宏包，一站式地解决了我的常见需求，
---

在 LaTeX 里面写表格一直非常令人头大：基础的表格不够用，CTAN 里面增强表格功能的宏包五花八门，网上搜索到的教程也各显神通。
最近我发现了一个叫 `tabularray` 的宏包，一站式地解决了我的常见需求，
所以尝试用本文总结一些心得。
我会从实际需求出发，总结我在写学术文章中遇到的一些表格使用场景，然后讲讲现时网络上相传更广的其它方案，
与 `tabularray` 做对比。

## 使用场景和痛点

### 文字性很强的表格

有的时候我需要用表格整理定性分析的结果，此时我的表格可能有一两行标题行以及一两列标题列归类“主题关键词”，
多为词语或简单词组。
而正文的每一个单元格里面可能是以短句为单位，还有时候一个单元格里面包含不定数量的短句数据。

{{< figure src="./images/wordy-table.png" alt="此种表格的一个使用例" >}}

此时我希望
* 标题列尽量短，给正文列留空间
* 正文单元格支持格内换行（图中没有展示）
* 正文占据主要空间，无需手动输入列宽
* 支持脚注
* （可选）右侧有向右对齐的一小列添加额外信息

### 宽大的数据分析表格

我们经常用到一些问卷数据和用户使用行为数据的统计分析。
这类表格唯一的排版难点就是分析指标多，即列数多。

{{< figure src="./images/statistic-table.png" alt="此种表格的一个使用例" >}}

此时我希望
* 拥有二级标题行，以及合并单元格的能力
* 可以控制列的对齐方式（例如数值列居中、文字列左对齐），但是另外地覆盖标题行的对齐方式（居中）
* 可以精细调整各列列宽

### 庞大的多维度勾选表格

在我的论文综述中，我要把自己调研到的很多相关文章按几大维度分类，每个维度下面可能还有子维度。
在每一个维度下，每一片论文工作可能隶属于一个或多个值。

{{< figure src="./images/categorizing-table.png" alt="此种表格的一个使用例" >}}

此时我希望
* 数据分析类表格的所有功能
* 可以旋转90度，并且应用在指定的单元格区域上（非整行或整列）
* （可选）可以更灵活地调整左对齐和居中对齐，并且应用在指定的单元格区域上（非整行或整列）
* （可选）表格可以换页

## 近现代实践

`tabularray` 自己在文档里也说了，建议在阅读该文档时，已经对其它更基础的表格宏包有所熟悉。
我在此处稍带恶趣味地把我的历程概述如下，但其实这或许也是大部分人在 LaTeX 中调表格的历程。

1. 调整列宽比较简单，自带的 `tabular` 环境就有 `p{宽度}` columntype 可以控制列宽
2. 使用 `p{}` columntype 之后，可以用 `\newline` 在单元格内换行。
3. 为了调右对齐，要引入 `array` 宏包。它提供了在 columntype 前后加入 `>{...}`、`<{...}` 的语法，大括号中的东西会应用在该列每个单元格的内容前后。
同时它提供了 `\raggedleft` 命令实现右对齐。但是该宏包重新定义了 `\\` 换行符，并提供了一个 `\arraybackslash` 恢复。
所以全部加起来，`>{\raggedleft\arraybackslash}p{宽度}` 即可实现右对齐。
    * `array` 宏包还新增了 `m{宽度}` 和 `b{宽度}` 的环境。
    * 嫌丑的话，亦可多引入一个 `ragged2e` 宏包，使用它的 `>{\RaggedLeft}p{宽度}` 右对齐。
4. 自适应列宽则需要引入 `tabularx` 宏包，使用它的 `X` columntype 让列拉伸占满剩余长度。同时表格环境要改成 `\begin{tabularx}{表格总宽}`。
    * 此时还会遇到类似目的的 `tabulary` 宏包和 `tabu` 宏包（已停止维护）。它们区别在哪儿呢？我不知道。
5. 给表格加上批注则需要 `threeparttable` 宏包，在 `table` 环境和 `tabular`（或其它等效环境）环境之见插入一个 `threeparttable` 环境。具体语法此处忽略。
    * 还有一个 `threeparttablex` 宏包。它有什么区别？我不知道。
6. 单元格合并则需要 `multirow` 宏包，在需要合并的单元格处使用 `\multirow` 和/或 `\multicolumn` 命令。
7. 表格换页则需要 `longtable` 宏包，用 `longtable` 环境替代 `tabluar`。（它是否涵盖 `tabularx` 等宏包的额外功能呢？我不知道）

## `tabularray` 实践

`tabularray` 是一个新晋的 LaTeX 表格库，因为使用了最新的 expl3 编程语法实现（本来为下一代 LaTeX 生态 LaTeX3 设计，后来提前加入在当前的 LaTeX2e 版本中），
可以比较精炼高效地开发更加丰富的表格功能。
和繁琐的近现代实践相比，`tabularray` 最大的魅力就在于上述需求它全部能搞定，语法还更加简洁。
对绝大部分常见的表格宏包新增功能，它也提供了这些功能的语法和实现，所以迁移成本和学习成本也不高。

换行直接把单元格内容括起来，然后同样用 `\\` 换行即可，非常易读。

```latex
% ...
cell & { multiline \\ cell } & cell \\
% ...
```

它把行和列的很多配置同等化了，于是合并单元格不用嵌套 `\multicolumn` 和 `\multirow` 了

```latex
\SetCell[r=2,c=3] this big cell & %...
```

配置水平对齐和垂直对齐也可以通过给基础 columntype `Q` 加参数而得

```latex
\begin{tblr}{ Q[t,l] Q[c,m] }
```

`Q` 里面传入的参数是无序的列表。控制左右对齐的关键词有 `l`eft（左）、`r`ight（右）、`c`enter（中）；
控制上下对齐的关键词有 `m`iddle（中）、`h`ead（文字框上边顶到行上边线）、`f`oot（文字框下边顶到行下边线）、
`t`op（文字框上边顶到基线）、`b`ottom（文字框下边顶到基线）。
其实 `Q` 是该宏包的唯一一个基础 columntype，其他的诸如 `l`、`p{}`、`X` 都是基于 `Q` 实现的。
除了左右对齐的关键词之外，颜色、边距等等都可以往里面传。

除了常规的的 `tblr` 环境，该宏包还提供了一个 `longtblr` 环境，这个环境包括了换页和表格脚注等等功能。

```latex
\begin{longtblr}[
    caption = {The Table Caption},
    entry = {Short Caption},
    label = {tblr:test},
    note{$\dag$} = {一个表格脚注，note的参数为引用时使用的上标符号},
    remark{注意了} = {一个不需要在表格正文中上标引用的脚注},
]{XXX}
    cell & cell & cell\note{$dag$}
\end{longtblr}
```

对于更精细的样式控制， `tabularray` 更是有一个绝活

```latex
\begin{tblr}{
    colspec = {XXX}, % 这是本来传入 tblr 的参数
    rowspec={|Q[t]|Q[m]|Q[b]|},
    width = 0.85\linewidth,
    col{odd} = {gray9},
    row{1} = {6em,azure2,fg=white,font=\LARGE\bfseries\sffamily},
    row{1-2} = {purple7},
    row{2-Z} = {3em,font=\Large},
    cell{1-4}{2-3} = {cmd=\fbox}
    hlines,
}
  % ...
\end{tblr}
```

把本来传入 `tblr` 环境的表列属性参数放到 `colspec` 下，原来还可以给 `tlbr` 传入这么多其他的参数！
正如我前面说的， `tabularray` 宏包让行与列的配置平起平坐，所以我们可以像传入 `colspec` 一样传入 `rowspec`，此处的 `|` 指的就是横向框线！
也可以单独传入 `hlines` 参数打开横向框线，就不需要在正文里面每行写一次了。
此外，可以单独选中某一（几）行、某一（几）列、或者某一块区域的单元格，并为它们设置样式。
本来需要自定义 columntype 才能实现的单元格样式自定义，也只需要定义一个 `\newcommand` 然后传进 `cmd=` 参数即可。

最后，上述代码也十分易读，不仅把样式和内容抽离，还提供了方便的索引等等语法。

## `tabularray` 的缺陷

灵活的功能也有一些代价，就是 `tabularray` 和传统的表格生态的兼容性稍差。
作为补偿，它提供了一些兼容性的语法和实现，但这仍然和大众写法不一样，导致我们需要停留在 `tabularray` 的体系内。
例如 `\newcolumntype` 需要改写成 `\NewColumnType`，`booktabs` 等宏包要使用 `\UseTblrLibrary{booktabs}` 来引入。

鉴于这个宏包在设计理念上面延展了传统的 LaTeX 表格，我觉得这种专用写法本身尚可接受，它显式区分了该宏包的体系和传统的表格体系。

但是如果真的因为混用导致了报错，该宏包在这些兼容性上的报错有些一头雾水。
加上这个库比较新，网上不一定能查到解决方案。
遇到表格相关的问题最好还是直接查阅 [`tabularray` 的文档](http://mirrors.ctan.org/macros/latex/contrib/tabularray/tabularray.pdf)。

## 一些额外感想

* 在 LaTeX 中，硬写死列宽没什么大不了，因为 LaTeX 输出的文档尺寸是固定的、字体也是指定的。
我写网页写习惯了， 一开始会把响应式设计的思想带到 LaTeX 里面，觉得写死宽度很脏。
其实不然。
* 对于标题列，什么时候在正文单元格里换行，什么时候在标题单元格里合并单元格？
如果一个正文单元格内含的条目数量没有很固定，则采用前者，在论文修改过程中给某一格正文加行减行，周围单元格可以自动伸缩。
如果一个正文单元格内含的条目数量比较固定，则用后者，大多是有二重标题列的时候，这样 LaTeX 代码更明确，脑海里知道排出来长什么样。

## 参考

* https://tex.stackexchange.com/questions/4839/raggedleft-paragraph-in-a-table
* http://mirrors.ctan.org/macros/latex/contrib/tabularray/tabularray.pdf
