---
title: "Tables in LaTeX – How tabularray Tackles the PITA in 2023"
date: 2023-01-13T22:38:52+08:00
lang: en
tags:
    - LaTeX
categories:
    - writing
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

## The `tabularray` Way

`tabularray` is a new LaTeX package for writing tables.
Because it uses newer expl3 language to implement,
its developers can efficiently add abundant features.
The most prominent charm of `tabularray` is that it can handle all the features mentioned above with a simpler syntax,
and it has a very friendly learning curve.

To add a wrap within a cell, simply surround the cell with braces and add `\\`. It is easy to write and read.

```latex
% ...
cell & { multiline \\ cell } & cell \\
% ...
```

It unifies manyh row configurations and column configurations, and there is no more nested `\multicolumn` and `\multirow` for cell combinations.

```latex
some cell & \SetCell[r=2,c=3] a big cell & %...
```

Horizontal and vertical alignment can be realized by adding optional parameters to its fundamental columntype `Q`.

```latex
% a top-left-aligned column, and a center-middle-aligned column
\begin{tblr}{ Q[t,l] Q[c,m] }
%...
\end{tblr}
```

The parameters passed to `Q` is an unordered list.
The keywords for horizontal alignment include `l`eft, `r`ight, `c`enter;
and those for vertical alignment include 
`m`iddle, `h`ead (text box top aligned with row top),
`f`oot (text box bottom aligned with the row bottom),
`t`op (text box top aligned with baseline),
`b`ottom (text box bottom aligned with baseline).
In fact, `Q` is the only and the most fundamental columntype in this package.
Other regular types like `l`, `p{}`, `X` are reimplemented based on `Q`.
Apart from alignment keywords, other keywords controlling colors and gutters are also accepted.

Apart from the regular `tblr` environment,
it also provides another `longtblr` environment with automatic page breaks and table footnotes.

```latex
\begin{longtblr}[
    caption = {The Table Caption},
    entry = {Short Caption},
    label = {tblr:test},
    note{$\dag$} = {A table note. The note's symbol is passed as an argument for `note`},
    remark{Pay attention!} = {A table note with no reference in the main table},
]{XXX}
    cell & cell & cell\note{$dag$}
\end{longtblr}
```

For finer formatting, `tabularray` has something else in its sleeves.

```latex
\begin{tblr}{
    colspec = {XXX}, % this is the argument originally (i.e., by default) passed to tblr
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

We can put the columntypes inside a named `colspec` parameter, and then we can use more named parameter when creating a `tblr` environment!
As I said before, this package wants to make columns and rows as equal as possible.
So we can declare `rowspec` the same way as we declare `colspec`,
and the `|` here means the horizontal lines!
We can also pass an `hlines` argument to turn on horizontal lines globally,
so we don't need to write once for every row.
What's more, we can also select specific rows, columns, or cells,
and configure their formatting.
It used to be hard to set complex formats for columns
and we used to customize a columntype.
Now we can simply define a command to be applied to every cell,
and pass this command to the `cmd=` parameter.

Lastly, the code sinppet above is easy to read.
It separates format declaration from the actual content,
and provides a simple indexing syntex.
最后，上述代码也十分易读，不仅把样式和内容抽离，还提供了方便的索引等等语法。

## Shortcomings of `tabularray`

On the opposite side of flexibility is the lack of perfect compatibility with traditional table "ecosystem".
As a compensation, `tabularray` offers some substitutional syntax.
But it is not identical to the traditional – or common – way of writing tables,
and we have to keep our feet inside the "`tabularray` ecosystem".
For example,
`\newcolumntype` is now `\NewColumnType`,
and packages like `booktabs` are imported using `\UseTblrLibrary{booktabs}`.

Since the package still borrows (and extends instead of replaces) the design of traditional LaTeX tables,
I am open to these mandatory changes personally,
and they explicitly distinguish themselves from the "traditional ecosystem".

However,
if there *are* errors caused by the mixed usage mentioned above,
the error messages are sometimes quite confusing.
Considering this packages is rather new,
it can be hard to find an answer online.
If you encounter any confusing problems,
a good alternative is to directly go to the [official `tabularray` documentation](http://mirrors.ctan.org/macros/latex/contrib/tabularray/tabularray.pdf)。

## Additional Thoughts

* In LaTeX, it is actually not a big deal to hardcode tables' column widths. Because LaTeX always generate a fixed-size document with fixed fonts.
I am quite used to writing web pages, where we never assume the font and the viewport dimensions are fixed. In LaTeX, hardcoding dimensions are not that dirty.
* For cells in header columns, when should we add line wraps in the cell, and when do we combine cells?
If the number of items (bullet points, cells, etc.) in a table body's cell is not fixed, then we use the former.
Because whenever we add or remove items in the body's cell, the header column's cells can resize adaptively.
If the number of items in the body is quite fixed, then we use the latter.
This is especially applicable to multi-level header columns.
In this way, we can have a better idea of the table's final appearance in advance.

## References

* https://tex.stackexchange.com/questions/4839/raggedleft-paragraph-in-a-table
* http://mirrors.ctan.org/macros/latex/contrib/tabularray/tabularray.pdf
