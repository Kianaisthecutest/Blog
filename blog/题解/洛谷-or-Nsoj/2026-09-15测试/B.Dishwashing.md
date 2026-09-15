---
title: Dishwashing
date: 2026-09-15
slug: 题解/洛谷-or-Nsoj/2026-09-15测试/B.Dishwashing
tags: [题解, 贪心]
---

{/*truncate*/}

<h5>

贪心一下每次放一个盘子，如果下一个是$x$需要满足以下情况：

<span>&lt;1&gt;</span> 找到一堆极左的盘子，满足该堆盘子里至少有一个盘子编号大于$x$。

<span>&lt;2&gt;</span> 如果该堆盘子中有小于$x$的，就把所有小于$x$的盘子拿走洗掉以保证单调性

$AI$ 说时间复杂度均摊的$O(n+n)$，但是也可以二分$O(nlogn)$解决

</h5>

```cpp
/*
先将较小的尽量放在左边，如果序列中有更小的就弹出

woc怎么样例全过了
*/
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=1e5+10;

int idx1[N];
stack< int > idx2[N];

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n;
    cin>>n;
    int pre=0;
    for( int i=1, x;i<=n;i++ )
    {
        cin>>x;
        if( x < pre )
        { cout<<i-1; QWQ }
        for( int j=x;j>=1 && !idx1[j];j-- ) idx1[j]=x;
        while( !idx2[idx1[x]].empty() && idx2[idx1[x]].top() < x )
            pre=idx2[idx1[x]].top(), idx2[idx1[x]].pop();
        idx2[idx1[x]].push( x );
    }
    cout<<n;
    QWQ
}
```