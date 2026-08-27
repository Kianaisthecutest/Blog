---
title: Make Geometric Sequence
date: 2025-07-11
slug: 题解/Atcoder/ABC-407/E-Most-Valuable-Parentheses
tags: [题解, ABC, 优先队列]
---

{/*truncate*/}

<h5>

题意：将数组的每一个位置上放一个左/右括号，使最终构成一个合法括号序列且左括号所在位置的权值和最大

解题思路：首先是个人都能想到的性质 ——> 左端必"$($", 右端必"$)$"  

想一想什么时候我们能加入一个右括号，很简单，还有左括号未被匹配的时候

再想一想什么时候我们能加入一个左括号，同样的，后面还能放右括号且不影响之前的括号的时候

将这两条性质分析一下，所以可知每放进两个数，我们必须增加一个左括号

而这个左括号的最优位置就是已经扫描的值中的最大值

于是我们就可以维护一个大根堆，在线处理所有的可选择位置，最后输出答案就行

</h5>

<summary><h3>AC代码</h3></summary>
<details>

```cpp
//能放"("的位置与上一个未匹配的括号之间的非"("位置要小于等于未匹配的"("的数量
//右括号的数量要恒小于等于左括号数量
//即每有两个值加入，堆内的值的数量恒等于取出的元素的数量 
//所以在线维护堆，每次加入两个值并取最大的值作为前面数字的最优取左括号即可 
#include <bits/stdc++.h>
#define ll long long
using namespace std;

void sovel()
{
	int n;
	cin>>n;
	ll ans=0;
	priority_queue< ll > pq;
	ll x;
	cin>>x;
	ans+=x;
	for( int i=1;i<n;i++ )
	{
		ll x1, x2;
		cin>>x1>>x2;
		pq.push( x1 ), pq.push( x2 );
		ans+=pq.top();
		pq.pop();
	}
	cin>>x;
	cout<<ans<<"\n";
}

int main() {
//   	freopen( "txt.in","r",stdin );
//   	freopen( ".out","w",stdout );
	std::ios::sync_with_stdio( false );
	std::cin.tie( nullptr );
	int t;
	cin>>t;
	while( t-- )
	{
		sovel();
	}
	return 0;
}
```

</details>

**时间复杂度**: $O(n)$