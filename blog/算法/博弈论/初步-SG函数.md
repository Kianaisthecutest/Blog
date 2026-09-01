---
title: 博弈论初步-SG函数
date: 2026-01-11
slug: 算法/博弈论/初步-SG函数
tags: [算法, 博弈论]
---

{/*truncate*/}

## <font color="#39C5BB">1.解决范围</font>

<h4>
	
在这里，我们讨论的是无偏组合（Impartial Combinatorial Games，IC）游戏，简称ICG游戏

规则
````
游戏有两人参与,二者轮流做出决策（必须做出决策）
当有一人无法做出决策时(即无法行动)游戏结束
````

要求
````
同一个状态不可能多次抵达
游戏不会有平局出现
无论决策如何，游戏可以在有限步内结束
任意一个游戏者在某一确定状态可以作出的决策集合只与当前的状态有关，而与游戏者无关
````

而这类题的解决方法就是通过有向无环图模型将博弈状态映射为SG值进行策略分析

组合游戏的胜负判定条件为各子游戏SG值的异或和是否为零，依据定理将复杂游戏简化为Nim游戏模型（单个堆的SG值等于堆内物品数）

而这个定理就是$Sprague-Grundy$（没错就是SG函数的那个SG）

</h4>

***

## <font color="#39C5BB">2.Bash Game巴什博弈</font>

<h4>

我们采用从特殊到一般的解决思路，得出$Bash\ \ Game$是一类较为简单的减法博弈

</h4>

```cpp
/*
首先考虑特殊情况当 n=k*( m+1 ) 个时先手必败，假设先手拿了x个，则后手一定可以拿 1 <= m+1-x <= m 个石头将倍数的局势延续下去
而最后的时候先手方会得到剩 m+1 个石头的必败局面
相应的，如果 ( m+1 ) 不被 n 整除时，先手可以将石头数调整为 ( m+1 )的倍数，相当于上一种情况的先后手互换，则先手必胜 
*/
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QAQ return ;
#define QWQ return 0;
#define TAT return

int main()
{
//	freopen( "txt.in","r",stdin );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, k;
	cin>>n>>k;
	cout<<( n%( k+1 ) ? 1 : 2 ); 
	QWQ
}
```

***

## <font color="#39C5BB">3.Nim Game尼姆博弈</font>

<h4>

Nim Game基本可以算是我们后面要写的博弈论题目的基础，它是一个基于异或和判断胜负的ICG游戏

先从最简单的这道Nim Game开始，我们可以在$\Omega (\prod_{i=1}^na_i)$的时间内求出某一局面是否是先手必胜（$\Omega$表下界，视作大于等于）

但是这个的时间复杂度太高了，根本用不上，我们可以观察到Nim Game的胜负只与当前情况有关

定义Nim和为当前剩余的所有状态的异或和，记作$nim$，可以证明当且仅当$nim=0$时先手必败

证明如下

<span>&lt;1&gt;</span>.当$nim=x_1=x_2=x_3...=x_n=0$时，此时先手必败

<span>&lt;2&gt;</span>.当$nim=x_1\oplus x_2\oplus x_3...\oplus x_n=x\neq 0$时，设$x$为1的最高位是$k$，则一定存在至少一个$x_i$的第$k$位也是1，则易得$x_i\oplus x\lt x_i$，说明对于任意一个$nim\neq 0$的局面，我们都可以通过在其中一堆中进行一个合法的操作得到

<span>&lt;3&gt;</span>.对于每一个$nim=x_1\oplus x_2\oplus x_3...\oplus x_n=0$的局面，我们无法只通过一次操作使$nim$保持0，因为假设对$x_i$操作变成了$x_i'$，则需要满足$x_1\oplus x_1\oplus x_2\oplus x_2\oplus x_3\oplus x_3...\oplus x_i\oplus x_i'...\oplus x_n\oplus x_n=0$，于是需要满足$x_i\oplus x_i'=0\to x_i=x_i'$，不满足不能不操作这条限制，

综上所述，我们利用反证法和归纳法就可以证明Nim Game的必胜规则

顺带一提，$SG$函数的值等于$nim$

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QAQ return ;
#define QWQ return 0;
#define TAT return

int main()
{
//	freopen( "txt.in","r",stdin );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, ans=0;
	cin>>n;
	for( int x;n;n-- ) cin>>x, ans^=x;
	cout<<( ans ? "win" : "lose" ); 
	QWQ
}
```

***

## <font color="#39C5BB">4.Sprague–Grundy Fuction SG函数</font>

<h4>

首先引入定义游戏和和游戏等价

1.游戏$G$和$H$的和，或称游戏组合，记作$G+H$，是指游戏$G+H=\{g+H:g\in G\}\cup \{h+G:h\in H\}$

2.如果对于所有游戏$H$，游戏$G1+H$和游戏$G2+H$都同处于必胜或必败状态，则称$G1$和$G2$等价，记作$G1\approx G2$

这里我们存在$SG$定理（不是很好证明，直接被定理就行），对于多个$ICG$游戏$G1\to Gn$，有$SG(G1+G2+G3...+Gn)=G1\oplus G2\oplus G3...\oplus Gn$

由此，可以总结出$SG$函数值的计算方法：

1.对于多个独立的游戏，可以分别计算它们的$SG$函数值，再求Nim和

2.对于单个游戏，每个状态的$SG$函数值都是它的所有后继状态的$SG$函数值的
$\operatorname{mex}$值

3.特别地，终止状态（即没有后继状态的状态）的$SG$函数值为$\operatorname{mex}\varnothing=0$

注：对于集合$A$，它的$\operatorname{mex}=\{x\notin N:x\in A\}$中的最小值，即未出现在集合内的最小非负整数

</h4>

***

## <font color="#39C5BB">5.例题选讲</font>

<h4>

这道格鲁吉亚和鲍伯算是很好的练手题了虽然它和$SG$函数没啥关系就对了

神秘的思维小转换题目，首先考虑将棋子两两配对，然后就转化为最基础的Nim游戏了

问题在于为什么可以这么思考，首先我们对一对棋子的一个端点向左移动后，我们完全可以将另一个端点向左移动相同的距离，问题不变

于是发现真正制约操作的部分是两两配对棋子的相对距离，这个距离不能小于2，于是抽象为最基本的Nim Game的模型

注意，对于奇数个棋子，只需要将第一颗棋子和坐标0对应就可以了

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QAQ return ;
#define QWQ return 0;
#define TAT return

const int N=1e3+10;
const string winer[2]={ "Georgia","Bob" };

int a[N];

void sovel()
{
	int n, ans=0;
	cin>>n;
	for( int i=1;i<=n;i++ ) cin>>a[i];
	if( n&1 ) a[++n]=0;
	sort( a+1,a+n+1 );
	for( int i=2;i<=n;i+=2 ) ans^=( a[i]-a[i-1]-1 );
	cout<<winer[( ans ? 0 : 1 )]<<" will win\n";
	QAQ
}

int main()
{
//	freopen( "txt.in","r",stdin );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ 
}
```

<h4>

而这个第二道剪纸游戏就是一个运用 SG 函数的典型例子了，它在读懂了$SG$函数的定义与求法后就能简便计算

首先分析题目，可以很快的想到我们不能切出任意$1\times n$或$n\times 1$的形态，这样是必败的

于是根据$SG$定理，将这些状态的$SG$函数值设定为0

然后思考如何将大的游戏分解为多个不同游戏的和

我们既可以竖切也可以横切，所以每个游戏会有两种不同的枚举子游戏

又因为$1\times n$或$n\times 1$是必败态，所以我们期望不要切出这个形状

于是本题的写法就明晰了，只需要$O(n^3)$预处理所有$SG$函数就能实现$O(1)$回答了

</h4>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QAQ return ;
#define QWQ return 0;
#define TAT return

const int N=2e2+10, M=2e2;

int SG[N][N];
bool vis[N];//寻找 mex 用 

void pre_work()
{
	for( int i=1;i<=M;i++ ) SG[1][i]=SG[i][1]=0;//无后继状态的 SG 函数为0 
	for( int i=2;i<=M;i++ )
		for( int j=2;j<=M;j++ )
		{
			for( int k=0;k<=M;k++ ) vis[k]=false;
			for( int k=2;k<i-1;k++ ) vis[SG[i-k][j]^SG[k][j]]=true;
			for( int k=2;k<j-1;k++ ) vis[SG[i][j-k]^SG[i][k]]=true;
			/*
			分竖切和横切两种情况
			因为切出 1*n 和 n*1 情况是必败的，所以我们期望不要出现这种情况 
			然后根据 SG 定理从 2~i-1 和 2~j-1 两次遍历算出该状态的 mex 值
			于是只有 nim 和，也就是 SG 函数值为 0 的情况先手必败 
			*/ 
			for( int k=0;k<=M;k++ ) if( !vis[k] ){ SG[i][j]=k; break; }
		}	
	QAQ
}

int main()
{
//	freopen( "txt.in","r",stdin );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	pre_work();
	int n, m;
	while( cin>>n>>m ) cout<<( SG[n][m] ? "WIN\n" : "LOSE\n" );
	QWQ 
}
```

***

## <font color="#39C5BB">6.方法简析</font>

<h4>

其实剪纸游戏确实花了我一点时间，总结下来是我对$SG$定理并不熟的结果

所以一定要先理解基础的$Nim\ \ Game$和$SG$定理，因为我们做的题都可以算作它们的衍生

而做题的关键就在于两点

1.找准无后继的末状态，也就是必败/胜态

2.其次寻找不同情况下能得到的所有子游戏的得到方式，然后使用$DP$预处理或带记忆化的$DFS$求解即可

</h4>