---
title: Make 2-Regular Graph
date: 2025-07-03
slug: 题解/Atcoder/ABC-412/D-Make-2-Regular-Graph
tags: [题解, ABC, 搜索]
---

{/*truncate*/}

<h5>

题意：使所有点的度为 2，即构建一张全部为环的图

关键数据范围：$3 \leqslant n \leqslant 8$

解题思路：因为点很少，所以可以$DFS$使用$O(n!)$的时间处理出全部为环的图，在跟原图比对取优即可

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=10;

int n, m, ans=INT_MAX;
int c[N];
bool vis[N];
bool rode[N][N];

void dfs( int st )
{
	if( st == n+1 )
	{
		int same=0, diffrent=0; 
		for( int i=1;i<=n;i++ )
		{
			if( rode[i][c[i]] || rode[c[i]][i] )
			{
				same++;
			}
			else
			{
				diffrent++;
			}
		}
		ans=min( ans,diffrent+m-same );
		return ;
	}
	for( int i=1;i<=n;i++ )
	{
		if( vis[i] || st == i || c[i] == st )
		{
			continue;
		}
		c[st]=i;
		vis[i]=true;
		dfs( st+1 );
		c[st]=0;
		vis[i]=false;
	}
}

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	scanf( "%d%d",&n ,&m );
	for( int i=1;i<=m;i++ )
	{
		int a, b;
		scanf( "%d%d",&a ,&b );
		rode[a][b]=rode[b][a]=true;
	}
	dfs( 1 );
	printf( "%d",ans );
	return 0;
}
```

</details>

**时间复杂度**：$O(n! \times n)$