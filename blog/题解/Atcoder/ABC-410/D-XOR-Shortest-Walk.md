---
title: XOR Shortest Walk
date: 2025-07-02
slug: 题解/Atcoder/ABC-410/D-XOR-Shortest-Walk
tags: [题解, ABC, 搜索]
---

{/*truncate*/}

## 分析

<h5>

题意：找 1 ——> n 的最小异或和路径

关键数据范围：$w \leqslant 2^{10} = 1024，n \leqslant 1000，m \leqslant 1000$

解题思路：因为最终的答案值域很小且此图为一个稀疏图，所以可以暴力$BFS$搜索从 1 到 n 的所有路径并将最小异或值保存，最后输出就行

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
bool vis[2010][2010];
vector <pair<int,int>> vc[2010];
int main(){
	int n,m; cin>>n>>m;
	for (int i=1; i<=m; i++){
		int u,v,w; cin>>u>>v>>w;
		vc[u].push_back({v,w});
	}
	vis[1][0]=1;
	queue <int> qx,qy;
	qx.push(1); qy.push(0);
	while (qx.size()){
		int x=qx.front(),y=qy.front();
		qx.pop(); qy.pop();
		for (auto z:vc[x]){
			if (!vis[z.first][z.second^y]){
				vis[z.first][z.second^y]=1;
				qx.push(z.first); qy.push(z.second^y);
			}
		}
	}
	for (int i=0; i<=2000; i++){
		if (vis[n][i]) {cout<<i; return 0;}
	}cout<<-1;
} 
```

</details>

## 时间复杂度

$O(w\times (n+m))$

***