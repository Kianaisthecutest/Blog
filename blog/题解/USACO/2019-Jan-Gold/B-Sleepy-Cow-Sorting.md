---
title: Sleepy Cow Sorting
date: 2026-09-17
slug: 题解/USACO/2019-Jan-Gold/B-Sleepy-Cow-Sorting
tags: [题解, USACO, 贪心, 平衡树, 树状数组]
---

{/*truncate*/}

<h5>

给出一个序列，每次可以将第一个值插入，求使其有序的步骤数量

相当于找一个极长的后缀不降子序列，将前面的数插入进去并查询排名

那么这个树状数组，线段树或者平衡树都可以解决了

时间复杂度：$O(nlogn)$

</h5>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return

const int N=1e5+10;

int n;
int p[N];
int tree[N];

inline int lowbit( int x ){ QAQ x&-x; }

inline void add( int x,int y )
{ for( ;x<=n;x+=lowbit( x ) ) tree[x]+=y; }

inline int query( int x )
{
    int ans=0;
    for( ;x;x-=lowbit( x ) ) ans+=tree[x];
    QAQ ans;
}

int main()
{
    // freopen( "1.in","r",stdin );
    // freopen( "1.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    cin>>n;
    for( int i=1;i<=n;i++ ) cin>>p[i]; 
    set< int > ans;
    p[n+1]=n+1;
    for( int i=n;i>=1;i-- )
        if( p[i] < p[i+1] ) ans.insert( p[i] ), add( p[i],1 );
        else                break;
    int m=n-ans.size();
    ans.insert( 0 ); ans.insert( n+1 );
    cout<<m<<"\n";
    for( int i=1;i<=m;i++ )
    {
        auto it=prev( ans.upper_bound( p[i] ) );
        int rnk=query( *it );
        //未排序位还有m-i个
        cout<<m-i+rnk<<" ";
        ans.insert( p[i] ); add( p[i],1 );
    }
    QWQ
}
```