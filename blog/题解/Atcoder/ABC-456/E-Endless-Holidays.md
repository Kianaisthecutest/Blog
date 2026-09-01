---
title: Endless Holidays
date: 2026-05-05
slug: 题解/Atcoder/ABC-456/E-Endless-Holidays
tags: [题解, ABC, 模拟]
---

{/*truncate*/}

<h5>

简单模拟即可

首先我们易得每次在相同的日期到达一个点是全部等价的，所以我们只需要记录到每个点的日期的访问次数即可

注意"休息一晚"这个限制，其实就等价于每个点存在自环，就可以实现过了一天但是依然在该点

最后注意判一下环，直接$dfs$暴力去找就行了

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

const int N=1e6+10, M=1e1+10;

int head[N], ver[N], nxt[N], CNT;
inline void add( int x,int y )
{
	ver[++CNT]=y, nxt[CNT]=head[x], head[x]=CNT;
	ver[++CNT]=x, nxt[CNT]=head[y], head[y]=CNT;
}

int n, m, w;
int vis[N][M];
bool rest[N][M], flag;

inline void dfs( int p,int x )
{
	int nxtd=x%w+1;
	for( int i=head[p];i;i=nxt[i] )
	if( vis[ver[i]][nxtd] == 1 ){ flag=true; QAQ; }
	else if( vis[ver[i]][nxtd] == 0 && rest[ver[i]][nxtd] )
	{
		vis[ver[i]][nxtd]=1;
		dfs( ver[i],nxtd );
	}
	vis[p][x]=2;
}

inline void intt1()
{
	CNT=0;
	for( int i=1;i<=n;i++ ) head[i]=0;
}

inline void intt2()
{
	for( int i=1;i<=n;i++ ) for( int j=1;j<=w;j++ ) vis[i][j]=0;
	flag=false;
}

inline void sovel()
{
	cin>>n>>m;
	intt1();
	for( int i=1, x, y;i<=m;i++ ) cin>>x>>y, add( x,y );
	cin>>w;
	intt2();
	char ch;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=w;j++ ) cin>>ch, rest[i][j]=( ch == 'o' );
	for( int i=1;i<=n;i++ ) add( i,i );
	for( int i=1;i<=n;i++ )
	{
		if( vis[i][1] == 2 || !rest[i][1] ) continue;
		vis[i][1]=1;
		dfs( i,1 );
	}
	cout<<( flag ? "Yes" : "No" )<<"\n";
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int t;
	for( cin>>t;t;t-- ) sovel();
	QWQ
}
```

</details>

<h5>

时间复杂度：$O(nw)$

</h5>
