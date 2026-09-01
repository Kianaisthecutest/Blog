---
title: Make Bipartite 3
date: 2026-05-25
slug: 题解/Atcoder/ABC-451/F-Make-Bipartite-3
tags: [题解, ABC, 并查集, 启发式合并]
---

{/*truncate*/}

<h5>

因为我们是不断加边变成一些连通块，并且每次颜色的变更只和新连接的两点有关

所以想到并查集，记录连通块大小和涂黑的数量，暴力合并点和改颜色

利用启发式合并可以达到将一个$O(n)$降至$O(logn)$

</h5>

<summary><h3>AC代码</h3></summary>
<details>
	
```cpp
/*
并查集，每次加边是否需要改变只有这条边的两点决定 
记录每个连通块内的涂黑量和大小
每次添边时合并集合即可 
*/
#include<bits/stdc++.h>
using namespace std;
#define QAQ return 
#define QWQ return 0;
#define ll long long
#define pii pair< int,int >

const int N=2e5+10;

int fa[N], siz[N];
inline int get( int x ){ QAQ ( fa[x] == x ? x : fa[x]=get( fa[x] ) ); }

bool color[N];
vector< int > rode[N];

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, q;
	cin>>n>>q;
	for( int i=1;i<=n;i++ ) fa[i]=i, rode[i].push_back( i );
	int black=0;
	for( int i=1, u, v, fu, fv;i<=q;i++ )
	{
		cin>>u>>v;
		fu=get( u ), fv=get( v );
		if( fu == fv ){ if( color[u] == color[v] ){ for( ;i<=q;i++ ) cout<<"-1\n"; QWQ } }
		else
		{
			black-=min( siz[fu],( int )rode[fu].size()-siz[fu] );
			black-=min( siz[fv],( int )rode[fv].size()-siz[fv] );
			//将原本的贡献减去 
			bool same=( color[u] == color[v] );//如果相等,那么其中一遍要所有颜色取反 
			if( rode[fu].size() > rode[fv].size() ) swap( u,v ), swap( fu,fv );//保证每次合并集合大小翻倍且操作次数不超过合并后的一般,达到O(nlogn) 
			for( auto son:rode[fu] )
			{
				if( same ) color[son]^=1;//换颜色 
				rode[fv].push_back( son );//加到新集合的根上 
			}
			if( same ) siz[fu]=rode[fu].size()-siz[fu];//颜色取反 
			siz[fv]+=siz[fu];//集合合并 
			black+=min( siz[fv],( int )rode[fv].size()-siz[fv] );//计算新贡献 
			rode[fu].clear();
			fa[fu]=fv;
		}
		cout<<black<<"\n";
	} 
	QWQ	  
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于启发式合并

</h5>
