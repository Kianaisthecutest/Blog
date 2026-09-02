---
title: Cover
date: 2026-09-02
slug: 题解/COCI/2017-2018-C/B-Cover
tags: [题解, COCI, 动态规划, 斜率优化]
---

{/*truncate*/}

## [COCI 2017/2018 #6] Cover
<details>
<summary>题干</summary>

<h2>题目描述</h2>

给定坐标系中的 N 个点。需要用一个或多个矩形覆盖这些点，使得满足以下条件：

- 每个矩形的边平行于坐标轴，
- 每个矩形的中心在原点，即点 (0, 0)，
- 每个给定点要么在矩形内部，要么在其边界上。

当然，可以用一个矩形覆盖所有的点，但这个矩形可能会有非常大的面积。我们的目标是找到所需矩形的选择，使得它们的面积总和最小。

<h2>输入格式</h2>

输入的第一行包含整数 N (1 ≤ N ≤ 5000)，表示点的数量。

接下来的 N 行中的每一行包含两个整数 X 和 Y (-50 000 000 ≤ X, Y ≤ 50 000 000, XY ≠ 0)，表示每个点的坐标。

<h2>输出格式</h2>

你必须输出所需的矩形面积总和的最小值。

<h2>输入输出样例 #1</h2>

<h3>输入 #1</h3>

```
2
1 1
-1 -1
```

<h3>输出 #1</h3>

```
4
```

<h2>输入输出样例 #2</h2>

<h3>输入 #2</h3>

```
3
-7 19
9 -30
25 10

```

<h3>输出 #2</h3>

```
2080
```

<h2>输入输出样例 #3</h2>

<h3>输入 #3</h3>

```
6
1 20
3 17
5 15
8 12
9 11
10 10
```

<h3>输出 #3</h3>

```
760
```

<h2>说明/提示</h2>

在占总分 40% 的测试用例中，将满足 N ≤ 20。

**第一个测试用例的说明：** 我们选择以给定点为对角的矩形，因为它满足题目中的条件。

**第二个测试用例的说明：** 我们选择两个中心在原点的矩形。第一个矩形的尺寸为 50 x 20，覆盖点 (25, 10)。第二个矩形的尺寸为 18 x 60，覆盖前两个点。如果我们想用一个矩形覆盖所有点，它的尺寸将是 50 x 60。

题面翻译由 ChatGPT-4o 提供。

</details>

***

## 分析

<h5>

因为中心对称的性质，所以我们不妨先全部取个绝对值

然后我们要寻找一些矩形全覆盖，被偏序的点肯定不会选择，那么选择完没被偏序的点就可以保证法

于是我们排除被偏序点后得到的点就一定是这样的

![](/img/Cover.jpg)

对于这些没被偏序的点，我们的选择分为两种

第一是用和自己等高的新矩形；第二是延续上一个矩形

于是容易设计状态$f_{i,0/1}$表示到了第$i$个矩形是否选择单独开一个矩形，记录$w_i=x_i\times y_i$，状态转移方程就是

$f_{i,0}=min( f_{i-1,0},f_{i-1,1} )+w_i$

$f_{i,0}=min( y_j\times x_i+f_{j,0}-w_j ),j\in [1,i)$

对于$f_{i,0}$的转移我们可以发现这个就是斜优的形式，所以可以$O(n)$进行DP

时间复杂度：$O(nlogn)$

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
#define intt __int128_t

const int N=5e3+10, inf=1e9;

struct LOCATION
{
    int x, y;

    bool operator< ( const LOCATION &z )const
    {
        if( x == z.x ) QAQ y < z.y;
        QAQ x < z.x;
    }

}loc[N], p[N];

struct LINE
{
    ll k, b;


    inline ll get( const ll &x )const
    { QAQ k*x+b; }

};

inline bool check( LINE l1,LINE l2,LINE l3 )
{ QAQ ( intt )( l3.b-l1.b )*( l1.k-l2.k ) <= 
      ( intt )( l2.b-l1.b )*( l1.k-l3.k ); }

ll w[N];
ll f[N][2];

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    for( int i=1, x, y;i<=n;i++ ) cin>>x>>y, loc[i]={ abs( x ),abs( y ) };
    sort( loc+1,loc+n+1 );
    stack< int > stk;
    for( int i=1;i<=n;i++ )
    {
        while( !stk.empty() && ( loc[i].x >= loc[stk.top()].x && loc[i].y >= loc[stk.top()].y ) ) stk.pop();
        stk.push( i );
    }
    int m=stk.size();
    while( !stk.empty() ) p[stk.size()]=loc[stk.top()], stk.pop();
    deque< LINE > dq;
    w[1]=1ll*p[1].x*p[1].y;
    f[1][0]=w[1]; f[1][1]=inf;
    dq.push_back( { p[1].y,f[1][0]-w[1] } );
    for( int i=2;i<=m;i++ )
    {
        w[i]=1ll*p[i].x*p[i].y;
        f[i][0]=min( f[i-1][0],f[i-1][1] )+w[i];
        while( dq.size() >= 2 && dq[0].get( p[i].x ) >= dq[1].get( p[i].x ) ) dq.pop_front();
        f[i][1]=dq.front().get( p[i].x );
        LINE nl={ p[i].y,f[i][0]-w[i] };
        while( dq.size() >= 2 && check( dq[dq.size()-2],dq[dq.size()-1],nl ) ) dq.pop_back();
        dq.push_back( nl );
    }
    cout<<4ll*min( f[m][0],f[m][1] );
    QWQ
}
```

</details>