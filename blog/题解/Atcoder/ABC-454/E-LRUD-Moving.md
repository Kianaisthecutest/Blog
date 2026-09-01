---
title: LRUD Moving
date: 2026-05-06
slug: 题解/Atcoder/ABC-454/E-LRUD-Moving
tags: [题解, ABC, 模拟, 二分图]
---

{/*truncate*/}

<h5>

询问出题人意图ing？

这是一个很神秘的题目，思维小实验一下赌到一个填充方法上写出来就过了？

但是我们是可以严肃证明这个思路的：考虑$01$染色，路径为$0->1->0...$

因为我们是要走偶数步，所以当$n\&1$时步数为奇数无解

在考虑我们"走到"不可达的点时，因为不可达所以易得颜色不同，所以当$(a+b)\&1$^$1$时无解

于是考虑逐行填充，在到不可达点时额外特判即可

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

inline void sovel()//真是思维小实验大分讨？？？ 
{
	int n, a, b;
	cin>>n>>a>>b;
	if( n&1 || ( a+b )&1^1 ){ cout<<"No\n"; QAQ; }//要么两行的连续填充会剩余，要么迫近点后会拧无法延伸 
	cout<<"Yes\n";
	int nowx=0;
	while( nowx+2 < a )//未到不经点所在行，直接填充两行 
	{
		for( int i=1;i<n;i++ ) cout<<"R"; cout<<"D";
		for( int i=1;i<n;i++ ) cout<<"L"; cout<<"D";
		nowx+=2;
	}
	int nowy=0;
	while( nowy+2 < b )//到了不经点所在行，不断填充两行并迫近 
	{
		cout<<"DRUR";
		nowy+=2;
	}
	if( nowy+1 == b ) cout<<"RD";//特判对于不经点如何移动 
	else              cout<<"DR";
	nowy+=2;//加上不经点填充的列 
	while( nowy < n )//填充剩下的列 
	{
		cout<<"RURD";
		nowy+=2;
	}
	nowx+=2;//加上不经点填充的行
	while( nowx < n )//填充剩下的行  
	{
		cout<<"D"; for( int i=1;i<n;i++ ) cout<<"L";
		cout<<"D"; for( int i=1;i<n;i++ ) cout<<"R";
		nowx+=2;
	}
	cout<<"\n"; 
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

时间复杂度：$O(tn^2)$

</h5>
