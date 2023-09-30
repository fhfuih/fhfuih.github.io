---
title: "Tables in LaTeX – How tabularray Tackles the PITA in 2023"
date: 2023-01-13T22:38:52+08:00
lang: zh-cn
draft: true
tags:
    - latex
summary: >
    Writing tables in LaTeX is always painful.
    The built-in standard `tabular` lacks many features,
    there are way too many packages on CTAN to use,
    and the tutorials online documents way too many solutions to a problem.
    Recently I found a new package called `tabularray` (new enough as it is written in LaTeX3),
    which meets all my current needs of a LaTeX table on its own.
---

Writing tables in LaTeX is always painful.
The built-in standard `tabular` lacks many features,
there are way too many packages on CTAN to use,
and the tutorials online documents way too many solutions to a problem.
Recently I found a new package called `tabularray` (new enough as it is written in LaTeX3),
which meets all my current needs of a LaTeX table on its own.
I will start from describing my needs and scenarios of using a LaTeX table in academic writing,
and compare `tabularray` with other most widespread practice online.

## My Use Scenarios

### Tables with Rich Text

Sometimes I need to use tables to organize qualitative alalysis results.
In this case, my table may have one or two header lines and one or two header columns.
They are used to display categorization keywords
and are usually simple words or phrases.
However, each body cell may have a sentence-level datum,
or an arbitrary number of sentence-level data.

{{< figure src="./images/wordy-table.png" alt="An example of this kind of tables" >}}

In this cas, I wish
* The title column is as narrow as possible to leave space for body cells.
    * The narrow width can be manually set, to guarantee layout clarity.
* The body cell supports multiple lines (not shown in the figure).
* The body takes up the most space without manually streching the width
* The footnotes are supported
* (Optional) a last column, right-aligned, for additional information

### Wide Tables for Data Analysis

We often conduct analyses on questionnaire and user behavior data.
These tables often contain a lot of metrics, i.e., columns.

{{< figure src="./images/statistic-table.png" alt="An example of this kind of tables" >}}

In this case, I wich
* There can be a secend-level header row, and the ability to combine cells.
* I can adjust the horizontal alignment of each column (e.g., centered numbers and left-alignted text),
and also override the horizontal alignment of header rows (e.g., center).
* I have fine-grained control over each column's width.

### Huge Tables with Multiple Dimensions

In my literature reviews,
I need to categorize the surveyed papers according to several given dimensions,
and a dimension may have its sub-dimensions.
In each (sub-)dimension, a paper may have one or many values.

{{< figure src="./images/categorizing-table.png" alt="An example of this kind of tables" >}}

In this case, I wish
* I have all the features of the [data analysis tables](#wide-tables-for-data-analysis).
* I can rotate cells by 90 degrees, and apply this rotation to specific cells (not necessarily an entire row or column).
* (Optional) I can control the horizontal alignment of specific cells (not necessarily an entire row or column).
* (Optional) The tables can span multiple pages.

## The “Early Modern” Implementation

`tabularray` mentions in its documentation that it is suggested to get familized with more common table packages in advance.
So here is my rediculous “standard practices” before my encounter with this package.
Perhaps this is also the case for most of us.

1. Adjusting column widths is easy.
The built-in `tabular` environment has a `p{WIDTH}` columntype to adjust the width.
2. Inside `p{WIDTH}` (and not other built-in columntypes), we can use `\newline` command to wrap inside a cell.
3. To right-align a column, we need to use `array` package.
It provides the `>{...}` `{...}<` syntax to appy code before and after each cell of this column.
It also provides the `\raggedleft` command for right alignment.
But that redefines the `\\` new row command, so it has another `\arraybackslash` to recover the definition.
Putting it all together, we can define a columntype of `>{\raggedleft\arraybackslash}p{宽度}` to right-align.
    * `array` package also has `m{WIDTH}` and `b{WIDTH}` for different vertically aligned variants of `p{}`.
    * If that looks ugly, the `ragged2e` package offers a better command so that we can use `>{\RaggedLeft}p{宽度}`.
4. The adaptive column width is realized by `tabularx` package.
Use its `tabularx` environment with an argument of the table width and the `X` columntype to strech the column to fit.
    * There are alternative packages for similar purposes: `tabulary` and `tabu` (the latter is obsolete). What's their difference? I don't know!
5. The footnotes are realized by the `threeparttable` package.
We can a `threeparttable` environment between the `table` and the `tabular` to do that. The detailed usage is omitted here.
    * And there is another `threeparttablex`. What's their difference? Again, I don't know!
6. Combining cells require the `multirow` package. You can use its `\multirow` and `\multicolumn` commands.
7. Multi-page tables require the `longtable` package. Replace `tabluar` environment with `longtable`.
    * Does it cover the additional features from `tabularx` and others? Again, I don't know!

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
