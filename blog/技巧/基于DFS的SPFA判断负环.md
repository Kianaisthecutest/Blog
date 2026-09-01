---
title: 基于DFS的SPFA判断负环
date: 2026-02-05
slug: 技巧/基于DFS的SPFA判断负环
tags: [技巧]
---

{/*truncate*/}

```cpp
inline bool spfa( int p,double mid )
{
	vis[p]=true;
	for( auto &[x,w]:rode[p] )
		if( dis[x] > dis[p]+w-mid )
		{
			dis[x]=dis[p]+w-mid
			if( vis[x] || spfa( x,mid ) ) return true;
		}
	vis[p]=false;
	return false;
}
```