---
title: 初等数学-线性代数(Linear Algebra)
date: 2025-08-18
slug: 算法/初等数学-线性代数(Linear Algebra)
tags: [算法, 矩阵]
---

{/*truncate*/}

## <font color="#GBDS34">1.向量</font>

<h4>

一个$n$维向量可以简单的想成$n$个数排列在一起，例如$V=[1\; 2\; 3]$就是一个三维行向量，其中$V_i$表示向量$V$的第$i$个元素

同理，$U=\begin{bmatrix}114\\514\\ \end{bmatrix}$就是一个二维列向量，为了区分向量与标量，"向量$V$"一般写作$\vec V$

向量的运算有加，减，点乘(内积)与叉乘(外积)，它们都要满足做运算的两个向量维度相等

假设存在两个$n$维向量$a$和$b$，则存在

$\vec a+\vec b=[a_1+b_1\quad a_2+b_2\quad a_3+b_3\cdots a_n+b_n]$

$\vec a-\vec b=[a_1-b_1\quad a_2-b_2\quad a_3-b_3\cdots a_n-b_n]$

$\vec a\cdot \vec b=\sum_{i=1}^{n} a_i\times b_i$

因为叉积的定义是在三维空间中垂直于两向量的另一向量，所以标准叉积只存在于$3$维向量的运算中

$\vec a\times \vec b=[a_2\times b_3-a_3\times b_2\quad a_1\times b_3-a_3\times b_1\quad a_1-b_2-a_2\times b_1]$

</h4>

***

## <font color="#GBDS34">2.矩阵</font>

<h4>

一个$n\times m$的矩阵可以视作$n$行$m$列的数排列在一起，例如$A_{2\times 3}=\begin{bmatrix}1&2&3\\4&5&6\\ \end{bmatrix}$就是一个$2\times 3$的矩阵

对于矩阵$A_{n\times m}$，$A_{i,j}(i\in [1,n],j\in [1,m])$表示矩阵第$i$行第$j$列上的值

对于矩阵$A_{n\times m}$和$B_{i\times j}$，当且仅当$(n==i\;and\;m==j)$时，我们称这两个矩阵同型

对于矩阵$A_{n\times m}$，当$n==m$时，我们称矩阵$A$为$n$阶方阵

对于一个方阵$E_{n\times n}$，当且仅当其主对角线上值为$1$其余值为$0$时，我们称矩阵$E$是一个$n$阶单位矩阵$E_{n}$

矩阵的运算有加减，两个矩阵能够运算当且仅当它们同型

对于矩阵$A_{n\times m}$和矩阵$B_{n\times m}$

$A_{n\times m}+B_{n\times m}=C_{n\times m}，C_{i,j}=A_{i,j}+B_{i,j}(i\in [1,n],j\in [1,m])$

$A_{n\times m}-B_{n\times m}=C_{n\times m}，C_{i,j}=A_{i,j}-B_{i,j}(i\in [1,n],j\in [1,m])$

对于单个矩阵，我们存在运算"转置"，$A_{n\times m}^{T}$表示$A_{n\times m}$转置后的矩阵

$A_{i,j}^{T}=A_{j,i}(i\in [1,m],j\in [1,n])$

矩阵的运算有数乘，将一个矩阵乘上一个实数$k$

$A_{i,j}=A_{i,j}\times k(i\in [1,n],j\in [1,m])$

矩阵的运算有乘法，对于矩阵$A_{n\times m}$和$B_{i\times j}$，当且仅当$m==i$时我们能够进行运算$AB$，这时我们称$A$右乘上$B$

对于矩阵$A_{n\times s}$和$B_{s\times m}$，记矩阵$C_{n\times m}=A_{n\times s}B_{s\times m}$

我们将矩阵的每一行视作一个向量，则$C_{i,j}=A_i\cdot B_j^T=\sum_{i=1}^{k}A_{i,k}\times B_{k,j}(i\in [1,n],j\in [1,m])$

矩阵乘法的性质：已知矩阵$A$，矩阵$B$，矩阵$C$，单位矩阵$E$和常数$k$

$EA=AE=A\qquad A(BC)=(AB)C\qquad k(AB)=(kA)B$

注意！矩阵乘法不存在交换律！！！

</h4>

***

## <font color="#GBDS34">3.矩阵快速幂与矩阵加速递推</font>

<h4>

在实数范围内，$n^k$表示将$n$连乘$k$次，根据矩阵乘法的限制可知，如果矩阵$A$也能够连乘，则$A$是一个方阵

而矩阵快速幂的步骤与实数的快速幂没有区别，只是更改成了矩阵的乘法而已

这里我们要引入一个定义：常系数齐次线性递推

假设存在数列$\{f\}$，$f_i$表示数列的第$i$项

$f_i=a_1\times f_{i-1}+a_2\times f{i-2}+\cdots +a_k\times f_{i-k}$

称$f$满足$k$次常系数齐次线性递推

例如斐波那契数列$fic_i=fic_{i-1}+fic_{i-2}$就满足$2$次常系数齐次线性递推

注意，像$f_i=f_{i-1}+f_{i-3}$这样的数列满足$3$次常系数齐次线性递推，因为它有一项$0\times f_{i-2}$

先想想我们递推求斐波那契数列的时间复杂度，很$EZ$且暴力的$O(n)$对吧

我们把斐波那契数列用矩阵表示一下可以得到

$\begin{bmatrix}f_i\\f_{i-1}\\ \end{bmatrix}=A\times \begin{bmatrix}f_{i-1}\\f_{i-2}\\ \end{bmatrix}$

容易发现$A$应该是一个$2\times 2$的方阵，式子变为

$\begin{bmatrix}f_i\\f_{i-1}\\ \end{bmatrix}=\begin{bmatrix}A_{1,1}&A_{1,2}\\A_{2,1}&A_{2,2}\\ \end{bmatrix}\times \begin{bmatrix}f_{i-1}\\f_{i-2}\\ \end{bmatrix}$

又由矩阵乘法公式得到

$$
\begin{cases}
f_i&=A_{1,1}\times f_{i-1}+A{1,2}\times f_{i-2}\\
f_{i-1}&=A_{2,1}\times f_{i-1}+A{2,2}\times f_{i-2}
\end{cases}
$$

易得$A=\begin{bmatrix}1&1\\1&0\\ \end{bmatrix}$

继续展开得

$\begin{bmatrix}f_i\\f_{i-1}\\ \end{bmatrix}=\begin{bmatrix}1&1\\1&0\\ \end{bmatrix}\times \begin{bmatrix}f_{i-1}\\f_{i-2}\\ \end{bmatrix}=\begin{bmatrix}1&1\\1&0\\ \end{bmatrix}^2\times \begin{bmatrix}f_{i-2}\\f_{i-3}\\ \end{bmatrix}=\cdots=\begin{bmatrix}1&1\\1&0\\ \end{bmatrix}^{n-2}\times \begin{bmatrix}f_{2}\\f_{1}\\ \end{bmatrix}$

使用矩阵快速幂的情况下就能以$O(\sum^3log(n))$的时间内求出答案($\sum$是$A$的阶)

这个时候，我们就称$A$是这个递推式的"矩阵加速矩阵"，通过这个方式我们可以快速求解常系数齐次线性递推的第$n$项

下面是斐波那契数列的矩阵加速递推代码

</h4>

```cpp
matrix base( 2,2 );//构造矩阵加速矩阵
base.mat[1][1]=base.mat[1][2]=base.mat[2][1]=1;
matrix right( 2,1 );//构造右边的矩阵
right.mat[1][1]=2, right.mat[2][1]=1;
if( n <= 2 ) cout<<right[n%2+1][1];//记得特判
else cout<<( quick_power( base,n-2 )*right ).mat[1][1];//矩阵加速递推
```

***

## <font color="#GBDS34">4.矩阵与图论</font>

<h4>

已知一个邻接矩阵$A_{n\times n}$，考虑一下$A^2$的运算过程

$A_{i,j}^{2}=\sum_{k=1}^{n}A_{i,k}\times A_{k,j}$

一眼~~丁真~~$Floyd$，所以这个时候$A_{i,j}^{2}$就代表了恰好经过两条边从$i->j$的方案数

再根据乘法原理，那么易得$A_{i,j}^{k}$的含义就是恰好经过$k$条边从$i->j$的方案数

例题：[HNOI2002]公交车路线

</h4>

```cpp
matrix mp(8, 8);//邻接矩阵
for( int i=1;i<=8;i++ )
    if( i!=5 )
        mp.mat[i][i-1]=mp.mat[i][i+1]=1;//手动构建临接矩阵
mp.mat[1][0]=mp.mat[8][9]=0;
mp.mat[1][8]=mp.mat[8][1]=1;
cout<<quick_power( mp, n ).mat[1][5];//矩阵快速幂求得答案
```
***

## <font color="#GBDS34">5.矩阵与多元方程</font>

<h4>

对于一个$n$元一次的方程组

$$
\begin{cases}
a_{1,1}x_1+a_{1,2}x_2+a_{1,3}x_3+\cdots+a_{1,n}x_n=q_1\\
a_{2,1}x_1+a_{2,2}x_2+a_{2,3}x_3+\cdots+a_{2,n}x_n=q_2\\
a_{3,1}x_1+a_{3,2}x_2+a_{3,3}x_3+\cdots+a_{3,n}x_n=q_3\\
\cdots\\
a_{n,1}x_1+a_{n,2}x_2+a_{n,3}x_3+\cdots+a_{n,n}x_n=q_n
\end{cases}
$$

我们可以将方程组的系数和常数写成一个$n\times n+1$的矩阵的形式，它称为原方程组的增广矩阵

$\begin{bmatrix}a_{1,1}&a_{1,2}&a_{1,3}\cdots a_{1,n}&q_1\\a_{2,1}&a_{2,2}&a_{2,3}\cdots a_{2,n}&q_2\\a_{3,1}&a_{3,2}&a_{3,3}\cdots a_{3,n}&q_3\\\cdots \\a_{n,1}&a_{n,2}&a_{n,3}\cdots a_{n,n}&q_n\\ \end{bmatrix}$

将一行乘以$k$，一行减去另一行等操作称为初等矩阵变换，$Guass$消元的过程就是模拟初等矩阵变换过程，将增广矩阵变换为上三角矩阵的过程

高斯消元最终会得到形如

$\begin{bmatrix}1&1&1\cdots 1&q_1\\0&1&1\cdots 1&q_2\\0&0&1\cdots 1&q_3\\\cdots \\0&0&0\cdots 1&q_n\\ \end{bmatrix}$

的矩阵，这时从最后一个方程开始不断反代就可以得到每个未知量的解

这里我们介绍另一种消元方式：$Gauss-Jordan$消元

它最终会将整个矩阵化为除第$n+1$列以外只有主对角线上存在值且为一的形式(简化行阶梯形)

$\begin{bmatrix}1&0&0\cdots 0&q_1\\0&1&0\cdots 0&q_2\\0&0&1\cdots 0&q_3\\\cdots \\0&0&0\cdots 1&q_n\\ \end{bmatrix}$

这样$A_{i,n+1}$就是第$i$个未知数的解，它的具体操作步骤如下

$$
\begin{cases}
<span>&lt;1&gt;</span>枚举主元x，依次消去第1∼N个未知量\\
<span>&lt;2&gt;</span>找到满足A_{p,x}\neq 0$的第1行，p\geqslant x\\
<span>&lt;3&gt;</span>交换第x行与第p行\\
<span>&lt;4&gt;</span>将交换后的第x行乘以\frac{1}{A_{p,x}}，使A_{p,x}==1(归一化处理)\\
<span>&lt;5&gt;</span>用第x行消去其他所有行的变元x
\end{cases}
$$

注意一下可能出现这些情况：

<span>&lt;1&gt;</span>线性方程$C$可以由线性方程$A$和$B$组合计算得到，这时候我们称$C$关于$A\ B$线性相关，在方程组中添加一个与原有的方程线性相关的方程不会对该方程组产生任何影响

<span>&lt;2&gt;</span>当我们解的某个未知量$U$的解是，$0\times U==0$时，$U$可以任意取值且不对原方程组产生影响，这时候我们称变量$U$与方程组线性无关

<span>&lt;3&gt;</span>当我们消元结束后，如果存在某一行的值全部被消完了，即对于第$i$行，$A_{i,i}=0$时，若$A_{i,n+1}=0$，则变量$x_i$可以任意取值，有无数种解，否则此方程组无解

例题：线性方程组

</h4>

```cpp
void jordan( int x )//消去第x个主元
{
	int p=x;//满足p>=x
	while( p <= n && mat[p][x] == 0 ) p++;//不满足就上加
	if( p == n+1 ) cout<<"No Solution", exit( 0 );//不存在唯一解
	swap( mat[x],mat[p] );//将第p行交换到第x行上
	for( int i=n+1;i>=1;i-- ) mat[x][i]/=mat[x][x];//归一化处理(倒序保证mat[x][x]最后才被修改)
	for( int i=1;i<=n;i++ )//消去其他行的变元x
	{
		if( i == x ) continue;//不能将自己这行消去
		for( int j=n+1;j>=1;j-- )//倒序保证mat[i][x]最后才被修改
			mat[i][j]-=( mat[x][j]*mat[i][x] );//已经归一化处理了，就是减去mat[i][x]倍mat[x]对应位
	}
}

for( int i=1;i<=n;i++ ) jordan( i );//将n个主元依次消去
cout<<fixed<<setprecision( 2 );
for( int i=1;i<=n;i++ ) cout<<"x"<<i<<"="<<mat[i][n+1]<<"\n";//第i行的第n+1个数就是变量x_i的值
```