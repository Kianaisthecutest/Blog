---
title: Rolete
date: 2026-08-25
slug: blog/题解/COCI/2023-2024-05/C-Rolete.md
---

贪心，二分，三分

{/*truncate*/}

考虑贪心

首先，当高度极高的时候它的代价一定是$0$(不用拉就都满足)，我们考虑从高到低计算

当我们从计算高度$h$的答案时，我们直接考虑从$h+1$的最优答案去转移

因为要少花费用，所以我们每次在上一个基础上将所以更高的$-1$就可以了

此时我们发现要么将更高的全部单个降低，要么用一次全局降低，选择费用较低的并记录即可

以下是一段比较感性的证明

如果你$x+1$的情况用这种方法得到了最优解，并且$x$的时候用这种方法得不到最优解

那么你一定是因为调整上面的某一步操作会让之前的代价更大但是此时的代价最小

显然如果会这样要么是之前用$1$代价更大但是如果用 1 可以减小本次使用 2 操作的代价

但是如果你之前用 2 现在用 1 的操作代价是一样的，所以你之前用$2$是不劣的

或者是之前用$2$代价更大但是用$2$操作可以拉下去一些本来不需要拉的窗帘，让你$1$操作的代价更小

但是你之前用$1$这下用$2$肯定也是不劣的

而对于这道题，我们还存在一个二分套三分的代码，它的思路也可以数学严谨的证明这个贪心的正确性

时间复杂度$O(q)$

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return 
#define intt __int128_t

const int N=1e5+10, m=1e5;

int pre[N], bck[N], all[N]; 
intt ans[N];

inline void print( intt x )
{
	if( x > 9 ) print( x/10 );
	putchar( x%10+'0' );
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, t, s, k;
    cin>>n>>t>>s>>k;
    for( int i=1, h;i<=n;i++ )
        cin>>h,
        pre[h]++, bck[h]++;
    for( int i=1;i<=m;i++ )   pre[i]+=pre[i-1];
    for( int i=m-1;i>=0;i-- ) bck[i]+=bck[i+1];
    for( int i=m-1;i>=0;i-- )
    {
        intt fee1=( intt )bck[i+1+all[i+1]]*t;
        intt fee2=( intt )s+( intt )k*pre[all[i+1]];
        if( fee1 <= fee2 ) ans[i]=ans[i+1]+fee1, all[i]=all[i+1];
        else               ans[i]=ans[i+1]+fee2, all[i]=all[i+1]+1;
    }
    int q, x;
    for( cin>>q;q;q-- ) cin>>x, print( ans[x] ), putchar( ' ' );
    QWQ
}
```