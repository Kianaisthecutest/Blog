---
title: Adding Chords
date: 2025-09-21
slug: 题解/Atcoder/ABC-424/F-Adding-Chords
tags: [题解, 随机哈希]
---

{/*truncate*/}

<h5>

题意：环上连点使每条边都不相交

解题思路：说是画了一条线，其实就是使其左右两段分成两个独立部分，使它们之间不能连线

那么现在思路就转化到了如何分段上，难点在于如何操作才能实现"划分"与"判断"这两个操作

这个时候就可以引入我们的黑科技"随机hash"了

我们将分割的两段视作给其中一段加上一个值，这时候如果查询两点间的和的差，就会发现它们会存在几倍的这个值

于是区间差分修改加前缀和查询(树状数组)就可以了

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=1e6+10;

int tree[N];

mt19937 s( 1145141919 );//随机黑科技

int lowbit( int x ){ return x & -x; }

void add( int x,int y )
{
  for( ;x<=1e6;x+=lowbit( x ) )
    tree[x]+=y;
}

int query( int x )
{
  int ans=0;
  for( ;x;x-=lowbit( x ) )
    ans+=tree[x];
  return ans;
}

int main()
{
  // freopen( "txt.in","r",stdin );
  ios::sync_with_stdio( false );
  cin.tie( nullptr ), cout.tie( nullptr );
  int n, q;
  cin>>n>>q;
  for( int i=1;i<=q;i++ )
  {
    int a, b;
    cin>>a>>b;
    if( a > b ) swap( a,b );
    int sum=query( b )-query( a-1 );//判断是否在同一边
    if( sum )
      cout<<"No\n";
    else
    {
      cout<<"Yes\n";
      int r=s();
      add( b,r ), add( a,-r );
    }
  }
}
```

</details>

**时间复杂度**：$O(q\times log(n))$


