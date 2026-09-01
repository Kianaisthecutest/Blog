---
title: Card Pile Query
date: 2026-05-04
slug: 题解/Atcoder/ABC-455/D-Card-Pile-Query
tags: [题解, ABC, 链表]
---

{/*truncate*/}

<h5>

容易想到我们其实只需要更新修改两个点的相对位置就可以表示清楚一整段的变化

所以写一个链表，每次更新移动最后暴力寻找每堆上的数的个数即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
类链表操作 
记录每个点的上面和下面是哪个，对于所有的堆去操作就行 
只有down是负数的说明是堆底，并标记着号码 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e5+10;

int up[N], down[N];
int start[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1;i<=n;i++ ) up[i]=0, down[i]=-i;
	for( int i=1, x, y;i<=q;i++ )
	{
		cin>>x>>y;
		//x放到y上面 
		if( down[x] >= 0 ) up[down[x]]=0;//防止下标乱飞 
		up[y]=x, down[x]=y;
	}
	for( int i=1;i<=n;i++ ) if( down[i] < 0 ) start[-down[i]]=i;
	for( int i=1;i<=n;i++ )
	{
		int ans=0, now=start[i];
		while( now ) ans++, now=up[now];
		cout<<ans<<" ";
	}
	QWQ;
}
```

</details>

<h5>

时间复杂度：$O(n)$

</h5>

