---
title: Crossing Table Cloth
date: 2026-05-15
slug: 题解/Atcoder/ABC-457/E-Crossing-Table-Cloth
tags: [题解, ABC, 贪心, 排序]
---

{/*truncate*/}

<h5>

因为要将区间$[l,r]$全部覆盖且不超出，所以容易想到我们找到的覆盖区间$[l1,r1]$和$[l2,r2]$至少满足$l1=l,r2=r$

再贪心的想一想，我们需要在$[x,y]$的范围内尽量的使$r1$大，使$l2$小

所以容易想到按照左端点和右端点的值开数组存储对应的区间的端点值，然后二分找范围内极大区间，判断区间是否闭合即可

但是这样就引出了下一个问题：当我们存在区间$[l,r]=[l1,r1]$时，如何判断是否还存在区间$[l2,r2]$满足$l\leq l2\leq r2\leq r$

因为我们要**恰好**两个区间，所以如果存在相同区间，则二分得到的两个极大区间是相同的，此时还要判断是否存在范围内的另一个区间(这段话是对上面式子的解释)

首先就是当我们还存在区间$[l1,r3]$或$[l3,r2]$时是满足的，而这个的判断方式就可以直接看我们二分后还有没有更小的值即可

然后处理寻找区间$[l3,r3]$满足$l\lt l3\leq r3\lt r3$这个问题，我们有一个巧妙的处理方式：

首先记录数组$mr[x]=min_{l_i>=x}(r_i)$，用不怎么规范的语言来形容就是"$r$的后缀最小值"

因为我们只是寻找是否存在一个被包含区间，所以依旧贪心的想，在存在一个较小区间时它的$r$尽可能小最好

所以我们只需要判断$mr[l+1]<r$即可，因为这样的含义就是存在一个满足$l\lt l3\leq r3 \lt r$的区间

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

const int N=2e5+10;

int mr[N]; 
vector< int > l[N], r[N];

inline bool check()
{
	int L, R;
	cin>>L>>R;
	int x=upper_bound( l[L].begin(),l[L].end(),R )-l[L].begin();
	int y=lower_bound( r[R].begin(),r[R].end(),L )-r[R].begin();
	if( x && l[L][x-1] == R )
	{
		if( x > 1 || y < int( r[R].size() )-1 || mr[L] < R ) QAQ true;
		else                                                 QAQ false;
	}
	else
	{
		if( x && y != r[R].size() && r[R][y] <= l[L][x-1]+1 ) QAQ true;
		else                                                  QAQ false;
	 } 
}

int main()
{
//	freopen( "txt.in","r",stdin );
//	freopen( "txt.out","w",stdout );
	ios::sync_with_stdio( false );
	cin.tie( nullptr ), cout.tie( nullptr );
	int n, m;
	cin>>n>>m;
	memset( mr,0x3f,sizeof mr );
	for( int i=1, L, R;i<=m;i++ ) cin>>L>>R, l[L].push_back( R ), r[R].push_back( L ), mr[L]=min( mr[L],R );
	for( int i=n;i>=1;i-- )
	{
		mr[i]=min( mr[i],mr[i+1] );
		sort( l[i].begin(),l[i].end() );
		sort( r[i].begin(),r[i].end() );
	}
	int q;
	for( cin>>q;q;q-- ) cout<<( check() ? "Yes" : "No" )<<"\n";
	QWQ	 
}
```

</details>

<h5>

时间复杂度：$O(nlogn)$，瓶颈在于排序

</h5>
