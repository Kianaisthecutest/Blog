---
title: 2-SAT
date: 2025-11-04
slug: 算法/2-SAT
tags: [题解, 2-SAT, 强连通分量]
---

{/*truncate*/} 

## <font color="#DD0ADA">1.SAT问题</font>

<h4>

什么是"2-SAT"?相信很多人存在这个疑问，我们需要把这个拆分为"2"和"SAT"来理解

"SAT"是"Satisfiability"的缩写，意为可满足性，即一串布尔变量，每个变量只能为真或假，要求对这些变量进行赋值，满足布尔方程

举个例子：

</h4>

```
<span>&lt;1&gt;</span>liaojie对代码有这些要求(至少满足一个):

1.不使用万能头

2.不进行宏定义

3.使用数据结构

<span>&lt;2&gt;</span>zhaojiyuan对代码有这些要求(至少满足一个):

1.使用万能头

2.进行宏定义

3.使用数据结构

<span>&lt;3&gt;</span>zengtao对代码有这些要求(至少满足一个):

1.使用万能头

2.不进行宏定义

3.使用数据结构 
```

<h4>

这就是一个3-SAT问题

我们不妨把三种要求设为$a,b,c$，变量前加$\lnot$表示「不」，即「假」，上述条件翻译成布尔方程即：$(\lnot a\lor \lnot b\lor c)\land (a\lor b\lor c)\land (a\lor \lnot b\lor c)$($\lor$即or，$\land$即and)

现在要做的是，为 ABC 三个变量赋值，满足三位学生的要求

而对于限制为2及以上的SAT问题，已证明他们$NP完全$(即没有固定的多项式复杂度的方法求解，只能暴搜)

</h4>

***

## <font color="#DD0ADA">2.2-SAT</font>

<h4>

~~对于2-SAT，我们直接暴搜解决，此贴结~~

我们可以强连通分量解决本题，这里我们一步步解决本问题

</h4>

### 1.建图

<h4>

将第$i$条限制$x$编号为$i$，而它的假命题$\lnot x$编号为$i+n$

对于每一条限制$(a\lor b)$，我们建两条有向边$\lnot a->b，\lnot b->a$，简单理解成"若a假则b一定真或若b假则a一定真"

这里我们可以写成大分讨连边，但是也可以写成简洁的位运算连边，请自行理解
  
</h4>

```cpp
int u, a, v, b;
cin>>u>>a>>v>>b;
rode[u+( a&1 ? n : 0 )].push_back( v+( b^1 ? n : 0 ) );
rode[v+( b&1 ? n : 0 )].push_back( u+( a^1 ? n : 0 ) );
```

### 2.判断

<h4>

我们使用强连通分量来解决2SAT问题，就以约束$(\lnot a\lor b)\land(a\lor b)\land(\lnot a\lor \lnot b)$举例

建图(主包不想画了)后可以发现，$\lnot a$与$b$在同一强连通分量内，$a$与$\lnot b$在同一强连通分量内，**<u>同一强连通分量内的变量值一定是相等的</u>**

有了上面那条重要的定理，我们就易得如果$a$和$\lnot a$在同一$SCC$中就无解

</h4>

```cpp
for( int i=1;i<=2*n;i++ )//记得两倍空间 
	if( !dfn[i] )
		dfs( i );//求SCC 
for( int i=1;i<=n;i++ )
	if( group[i] == group[i+n] )
		cout<<"IMPOSSIBLE", exit( 0 );
```

### 3.特解

<h4>

在判断有无解后我们如何得到一组特解呢？

对每个点与它的反点取强连通分量较大值即可，这是因为在使用$Tarjan$算法求出强连通分量的过程中，已经为每组强连通分量标好顺序了

<details>

<summary>详细的证明</summary>

![](/img/2-SAT.jpg)

</details>

</h4>

```cpp
for( int i=1;i<=n;i++ )
	cout<<( group[i] < group[i+n] )<<" ";
```

***

## <font color="#DD0ADA">3.例题</font>

<h4>

拿Katu Puzzle 卡图难题举例，我们可以很快的分析出每一个式子代表的就是一条2-SAT限制

于是直接建图然后跑$SCC$就可以了

用2-SAT解决的问题的难点在于如何把问题转化为2-SAT去实现，这些题目一般都是给定限制求解类问题，如果你觉得这个是3-SAT甚至更高的SAT问题，不妨将式子进行一些拆分转化，说不定就会变成2-SAT的简单题目

</h4>