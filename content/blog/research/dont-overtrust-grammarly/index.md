---
title: "不要过度信任 Grammarly"
date: 2023-06-29T13:48:25+08:00
lang: zh-cn
summary: >
    虽说 Grammarly 是大家的写作检查小帮手，但在我用学术论文深度考验它之后，发现它的准确度并不理想。
    以下就是我遇到过的一些误报案例，在这儿零碎总结一下。
tags:
    - latex
    - grammarly
---

Grammarly 这款语法检查软件想必大家都不陌生。
虽说 Grammarly 是大家的写作检查小帮手，但在我用学术论文深度考验它之后，发现它的准确度并不理想，
一整个章节的文字中甚至有可能有将近一半的红色标记我都不会采纳。
（注：红色标记是 grammarly 判定为“错误”而非“改善”的地方）
以下就是我遇到过的一些误报案例，在这儿零碎总结一下。

## 纯纯误报

好像 Grammarly 对伴随状语从句的识别一直不够理想，如果主句和从句的分词不一样，很容易把它骗到。
例：
> The design is illustrated in Figure 1, each feature elaborated below.

这句话没有语法问题，Grammarly 会先建议把“, each”改成“. Each”
（或者“; each”、“, and each”，总之本质上就是把独立主格结构的伴随状语从句改成独立的一句话）
当你真的采纳建议了，它又发现这句话没有谓语，再让你改成“Each feature **is**”。

当一个复合词有加和不加不加连字号的两种常用形式，Grammarly 经常也会搞不清它们的使用场景和词性。例：
> The data is collected in real time.

Grammarly 会无脑把所有“real time”改成“real-time”。但是两者对比的话，“real-time” 自己更适合单独作为一个形容词，
而修饰动词的时候因为用“in”后面要接名词词性，拆开更为合适。

更有意思的是，如果这里用的是“in real-time”，另一款语法检查软件 LanguageTool 会用红色标记订正为“in real time”。
不如让这俩打一架？

## 过分强调简洁

强调简洁导致替换成理论上近义、实则不搭的词。例：
> The AR design should be in accordance with the geographical semantics and physical appearances of the real-world elements.

Grammarly 建议改成“by”、“following”、“per”、“under”，就为了改掉这个“wordy”的“in accordance”。
但是代入这句话会发现除了“following”，剩下三个词从语义和搭配上都特别不通顺。
至于“should be following”则不如直接改成“should follow”。
而且似乎也是“The designers [of the AR experience] should follow...”而不是“The AR design should follow”。

强调简洁导致措辞单一。例：
> Users can take part in the game by...
>
> It can help improve users' physical and mental health, as well as provide a more engaging experience.

在第一句中，Grammarly 会无脑建议把“take part”改成“participate”，即便我整篇文章已经用了很多次“participate”。
而在第二句中，它会无脑建议把“, as well as”改成“and”，这不仅会导致类似的用词重复的问题，还会让两个作用不同的 and 出现在一块儿，
让句子第一眼看上去更难理解。
（这其实是我经常喜欢用的一个小技巧，在一句有多处需要并列的时候，把更简短的部分用 and 连接、把更大块的区域用其他连词连接来做区分，
例如这句话用 and 连接第一个宾语，as well as 连接 can 后面的两个谓语+宾语的组合。

## 过度惩罚插入语

例：
> However, most research studies the more popular live-streaming genres, e.g., gaming and life-sharing.
> Cultural live streaming, despite its growing popularity, is relatively new and understudied.

Grammarly 会尝试把第二句的“Despite……”放在句首，但是这么做会导致 Despite 修饰的对象不明确。
假设 Desipte 在前，读者从上面一路读下来，很容易以为它指的是“the more popular (gaming and life-sharing) live streaming”，
然后读到后半句才发现其实它修饰的是“Cultural live streaming”。
另外在这句话中，把 despite 放在句末似乎也不太合适。因为我在（未节选出来的）前文提到了它们近年来更受欢迎，
这里想表达“即便如此，还是比其他直播类别更新一些”，所以为了呼应前文的“扬”，最好是先“扬”再“抑”，
否则突然批判容易让读者感觉前后矛盾。

## 对标点符号的严厉程度不同

例：
如果文档中混用了直引号和弯引号，Grammarly 会说
“两者皆可，但是建议统一用法”，
然后帮读者全局替换。

但是其实正确的英文排版**应当使用弯引号**，
直引号只是早期打字机和电脑为了节省字符数量而发明的产物，
在现代电子文档中一般只有编程代码中会直接使用。
其实很多现代的电子排版软件都会自动帮用户把直引号转成弯引号
（包括 Word、 macOS 操作系统本身等等）。
至于 LaTeX，则是会在把直引号编译成正确的弯引号字符。
但是如果这一例展现了 Grammarly 对标点符号的宽容，下一例又展现了另一场景下 Grammarly 的严格。

例：
如果 and 连接的后半句不是完整句、而是和 and 前半句共享主语的话，则 and 前不应当加逗号。

但是展开 Grammarly 的 Learn More 按钮，能看到它说“偶尔这么用也无伤大雅，且能帮助读者更好地断句和停顿”。
其实还有很多类似的情况：逗号后面跟着一个连词，则它必须连接一个完整句，否则就要去掉逗号；
句末的从句修饰宾语而不是整句话的时候，从句前面也不应当加逗号。

## 一些奇怪的同义词建议

以下是 Grammarly 给我建议的一些同义词用词建议，但是反而显得弄巧成拙。

* completely -> wholly 但是后者更少见
* huge -> vast, substantial 但是我想表达的是物理尺寸
* randomness -> randomnesses

## 总之……

千万不要全盘接受一个乌克兰公司给你的英语写作建议。
不过有时候，咱们如果真的写了一句长难句触发了 Grammarly 的误报，也可以思考一下需不需要改写整个句子，拆成几个小短句。
毕竟写作文不是考高考，“长难句”顾名思义就是会为难读者。
稍微运用一下、提升文章的气势，点到即可。

