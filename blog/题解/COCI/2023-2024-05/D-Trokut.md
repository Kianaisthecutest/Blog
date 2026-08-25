---
title: Trokut
date: 2026-08-25
slug: blog/题解/COCI/2023-2024-05/D-Trokut.md
---

博弈论，Ad-hoc

{/*truncate*/}

博弈论经典操作之先找小的特殊情况，再DP推广

首先我们容易想到每次连接两个点其实会把整个问题分成两个更小的子问题

于是我们考虑分讨这两个子问题的状态

```
<1> 0 and 0
后手无论怎么选都会输，先手必胜

<2> 0 and 1
后手进入唯一必胜态，先手必败

<3> 1 and 0
同<2>，先手必败

<4>1 and 1
后手选择必胜态进入，含义是在该集合中一定存在使先手最后要连接已涂色点
但是先手可以选择另一个必胜态，相当与将一个必胜态转移为 0 后选择另一个 1
同<2><3>，先手必胜
```

即异或和决定先后手必胜

然后我们思考一下边界，当划分后没有点了或者只有一个点了此时先手只能连接两个选择过的点，必败

即f[0]=f[1]=0

然后我们写出这个$O(n^2)$代码就可以过前面$n\leq 1000$



```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 

const int N=5e3+10;

int f[N];

inline void init()
{
    f[0]=0; f[1]=0;
    for( int i=2;i<=200;i++ )
    {
        map< int,bool > vis;
        for( int j=0;( j+2 )<=i;j++ ) vis[f[j]^f[i-j-2]]=true;
        while( vis.find( f[i] ) != vis.end() ) f[i]++;
    }
}

inline void sovel()
{
    int n;
    cin>>n;
    if( n <= 69 ) cout<<( f[n] ? "Lucija\n" : "Ivan\n" );
    else          cout<<( f[( n-70 )%34+70] ? "Lucija\n" : "Ivan\n" );
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
	init();
    int t;
    for( cin>>t;t;t-- ) sovel();
    QWQ
}
```