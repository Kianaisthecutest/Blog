---
title: Catch All Apples
date: 2026-05-15
slug: 题解/Atcoder/ABC-457/G-Catch-All-Apples
tags: [题解, ABC, 二维偏序, Dilworth定理]
---

{/*truncate*/}

<h5>

~~超级无敌雷霆牛逼的转化神人模板题目~~

首先我们考虑将所有的点转化为二维平面上坐标为$(x_i,t_i)$的点，然后再考虑如何做这个题

这时候我们容易发现所有的可以连续取到苹果的点都在该点向右上和右下的$\frac{\pi}{4}$所在的范围内

然后为了方便处理，我们将整个坐标轴旋转$\frac{\pi}{4}$，所以所有可连续到达的点都再这个映射坐标系情况下的左上方(即满足二维偏序)

假设将可连续抵达点连边，我们就将这个题转化成有向图的最小链覆盖

但是又因为本题的二维偏序满足传递性，所以我们又可以使用$Dilworth$定理转化为反图上的最长链长度

所以最后再跑一遍$DP$去找最长不升子序列即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=3e5+10;

struct value
{
	int x, y;
	
	bool operator< ( const value &v )
	{
		if( y != v.y ) QAQ y > v.y;
		QAQ x < v.x;
	}
	
}val[N];

int f[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n;
	cin>>n;
	for( int i=1,t, x;i<=n;i++ ) cin>>t>>x, val[i]={ x+t,x-t };
	sort( val+1,val+n+1 );
	int m=0;
	for( int i=1;i<=n;i++ )
	{
		int pos=lower_bound( f+1,f+m+1,val[i].x,greater< int >() )-f;
		if( pos == m+1 ) f[++m]=val[i].x;
		else             f[pos]=max( f[pos],val[i].x );
	}
	cout<<m;
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于排序

</h5>
