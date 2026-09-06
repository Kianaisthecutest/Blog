---
title: ENDOR
date: 2026-09-05
slug: 题解/COCI/2015-2016-B/D-ENDOR
tags: [题解, COCI, 余数分组, 模拟]
---

{/*truncate*/}

## [COCI 2015/2016 #4] ENDOR
<details>
<summary>题干</summary>

<h2>题目描述</h2>

如果我们相信《吉尼斯世界纪录大全》的话，在布满森林的 Endor 卫星上，有一根全银河系最长的棍子。在那根 $L$ 米长的棍子上有 $n$ 只欢快的变色龙。每只变色龙以 $1$ 米/秒的恒定速度沿着棍子在两个可能的方向（左或右）中的一个方向上移动，并以可能的 $k$ 种颜色之一着色。

众所周知，Endor 卫星上的变色龙崇拜古老的蚂蚁法则，该法则规定变色龙必须沿着棍子行走直到走到棍子的末端，并且当与另一只变色龙发生碰撞时，该变色龙必须转过 $180$ 度，继续朝相反的方向行走。此外，在向左移动着色为 $a$ 的变色龙与向右移动的着色为 $b$ 的变色龙发生碰撞后，碰撞前向左移动的变色龙采用碰撞前向右移动的变色龙的颜色 $b$，而在碰撞前向右移动的变色龙会采用新的颜色 $(a+b)\bmod k$。

如果给你所有变色龙的初始位置、颜色和运动方向，对于每种颜色，确定采用该种颜色的变色龙在离开棍子之前的总行程。

<h2>输入格式</h2>

第一行输入三个整数 $n,k,L$，分别表示变色龙的只数，颜色的种数和棍子的长度。  
随后 $n$ 行，每行两个整数 $d_i,b_i$ 和一个字符 `L` 或 `D`，其中 $d_i,b_i$ 分别表示第 $i$ 只变色龙到棍子**左端**的距离和第 $i$ 只变色龙的颜色，字符如果是 `L`，则表示第 $i$ 只变色龙初始时面朝左边，否则表示第 $i$ 只变色龙初始时面朝右边。保证 $d_i$ 两两不同且按升序给出。

<h2>输出格式</h2>

输出 $k$ 行，第 $i$ 行输出一个实数，表示采用第 $i-1$ 种颜色的变色龙离开棍子之前的总行程，**保留一位小数**。可以证明，答案要么是整数，要么是形如 $\texttt{x.5}$ 的一位小数。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
2 3 10
0 0 D
10 1 L
```

<h3>输出 #1</h3>

```
10.0
10.0
0.0
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
4 3 7
1 0 D
3 0 D
4 1 L
6 2 D
```

<h3>输出 #2</h3>

```
10.0
4.0
1.0
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
4 4 5
1 1 D
3 3 L
4 2 D
5 0 L
```

<h3>输出 #3</h3>

```
2.5
4.0
2.5
4.0
```

<h2>说明/提示</h2>

**【样例 1 解释】**

两只变色龙在行走了 $5$ 米之后发生碰撞。在此之后，$1$ 号变色龙的颜色变为 $0$，$2$ 号变色龙的颜色变为 $1$，然后它们各又继续走了 $5$ 米然后离开棍子。因此，采用第 $0$ 种颜色和第 $1$ 种颜色的变色龙各走了 $10$ 米，在此过程中不存在采用第 $2$ 种颜色的变色龙。

**【数据范围】**

对于 $50\%$ 的数据，保证 $1\leqslant n\leqslant 3000$。  
对于所有数据，$1\leqslant n\leqslant 10^5$，$1\leqslant k\leqslant 40$，$1\leqslant L\leqslant 10^6$，$0\leqslant d_i\leqslant L$，$0\leqslant b_i<k$，$d_{i-1}<d_i$。

**【题目来源】**

本题来源自 **_[COCI 2015-2016](https://hsin.hr/coci/archive/2015_2016/) [CONTEST 4](https://hsin.hr/coci/archive/2015_2016/contest4_tasks.pdf) T6 ENDOR_**，按照原题数据配置，满分 $160$ 分。

由 [Eason_AC](https://www.luogu.com.cn/user/112917) 翻译整理提供。

</details>

***

## 分析

<h5>

相撞后换色的操作我们可以看作向右不变向左的被进行一次操作  

所以向左的我们可以快速算出，因为他们相当于直接走到头

首先我们只关注颜色而不关注类型，注意到$k$很小考虑按颜色分组

进入一个变化序列后他们的变化是相同的，所以逆序处理，每次记录当前后缀产生的贡献  

时间复杂度$O(nk)$ 

</h5>

***

## AC代码
<details>
<summary>Code</summary>

```cpp
#include<bits/stdc++.h>  
using namespace std;   
#define ll long long  
#define pii pair< int,int >  
#define QWQ return 0;   
#define QAQ return  
  
const int N=1e5+10, M=4e1+10;   
  
struct POSITION  
{   
    int x, col, dir;   
  
    bool operator< ( const POSITION &y )const  
    { QAQ x < y.x; }   
  
}pos[N];   
  
double add[M], tmp[N], ans[M];   
  
int main()   
{   
    // freopen( "1.in","r",stdin );   
    // freopen( "1.out","w",stdout );   
    ios::sync_with_stdio( false );   
    cin.tie( nullptr ); cout.tie( nullptr );   
    int n, k, l;   
    cin>>n>>k>>l;   
    char dir;   
    for( int i=1, x, y;i<=n;i++ )   
        cin>>x>>y>>dir,   
        pos[i]={ x,y,( dir == 'L' ) };   
    sort( pos+1,pos+n+1 );   
    int minr=l+1, lstx=l, Col=0;   
    for( int i=1;i<=n;i++ )   
    {   
        auto &[x,col,dir]=pos[i];   
        if( dir )   
        {   
            for( int j=0;j<k;j++ ) ans[( col+j )%k]+=add[j];   
            if( minr != l+1 ) ans[col]+=0.5*( x-lstx );   
            ans[( col+Col )%k]+=( minr != l+1 ? 0.5*( x+minr ) : x );   
        }   
        else  
        {   
            ans[col]+=l-x;   
            for( int j=0;j<k;j++ ) tmp[j]=add[j], add[j]=0;   
            for( int j=0;j<k;j++ ) add[( j+col )%k]+=tmp[j];   
            if( minr != l+1 )   
                add[col]+=0.5*( x-lstx ),   
                Col=( Col+col )%k;   
            else minr=x, Col=col;   
            lstx=x;   
        }   
    }   
    for( int i=0;i<k;i++ ) cout<<fixed<<setprecision( 1 )<<ans[i]<<"\n";   
    QWQ  
}
```

</details>