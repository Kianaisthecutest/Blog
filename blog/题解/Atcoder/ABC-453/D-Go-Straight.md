---
title: Go Straight
date: 2026-05-17
slug: 题解/Atcoder/ABC-453/D-Go-Straight
tags: [题解, ABC, 搜索]
---

{/*truncate*/}

<h5>

没有什么好说的，因为每个点的状态至多$4$个($4$个方向)，一共$10^6$个点，即使访问每个状态也最多只有$4\times 10^6$个

直接$DFS$暴搜即可

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

const int N=1e3+10, M=5e6+10;
const int ix[4]={ 1,0,0,-1 };
const int iy[4]={ 0,1,-1,0 };
const char direction[4]={ 'D','R','L','U' };

int n, m, s;
int nx, ny;
int ans[M];
char mp[N][N];
bool vis[N][N][4];

inline bool check(){ QAQ ( nx >= 1 ) && ( nx <= n ) && ( ny >= 1 ) && ( ny <= m ) && mp[nx][ny] != '#'; }

inline void dfs( int x,int y,int dir )
{
	if( vis[x][y][dir] ) QAQ ;
	vis[x][y][dir]=true;
	if( mp[x][y] == 'G' )
	{
		cout<<"Yes\n";
		for( int i=1;i<=s;i++ ) cout<<direction[ans[i]];
		exit( 0 );
	}
	else if( mp[x][y] == 'o' )
	{
		nx=x+ix[dir], ny=y+iy[dir];
		if( check() )
		{
			ans[++s]=dir;
			dfs( nx,ny,dir );
			s--;
		}
	}
	else if( mp[x][y] == 'x' )
	{
		for( int i=0;i<4;i++ )
		{
			if( i == dir ) continue;
			nx=x+ix[i], ny=y+iy[i];
			if( check() )
			{
				ans[++s]=i;
				dfs( nx,ny,i );
				s--;
			}
		}
	}
	else 
	{
		for( int i=0;i<4;i++ )
		{
			nx=x+ix[i], ny=y+iy[i];
			if( check() )
			{
				ans[++s]=i;
				dfs( nx,ny,i );
				s--;
			}
		}
	}
} 

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	cin>>n>>m;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) cin>>mp[i][j];
	int x, y;
	for( int i=1;i<=n;i++ ) for( int j=1;j<=m;j++ ) if( mp[i][j] == 'S' ) x=i, y=j;
	vis[x][y][1]=vis[x][y][2]=vis[x][y][3];
	dfs( x,y,0 );
	cout<<"No";
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(n^2)$

</h5>