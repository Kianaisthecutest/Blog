---
title: 「Ceoi 2011」ballons
date: 2025-08-16
slug: 题解/洛谷-or-Nsoj/[Ceoi-2011]ballons
tags: [算法, 单调栈]
---

{/*truncate*/}

```cpp
#include<bits/stdc++.h>
using namespace std;

const int N=2e5+10;

int n;
double x[N], r[N];
stack< int >stk;
//单调栈-->单调不增 
//首先，后出现的圆y的X坐标大于前面出现的圆x的X坐标
//如果此时它的半径Yy也大于前面的半径Yx，则说明前面的圆x不可能再是相切圆了
//即无论如何，如果在后面出现的圆z中考虑与圆x相切的情况
//圆z一定会先跟圆y相交 

double max_r( int,int );

int main() {
//    freopen( "txt.in","r",stdin );
	scanf( "%d",&n );
	for( int i=1;i<=n;i++ )
	{
		scanf( "%lf%lf",&x[i] ,&r[i] );
		while( !stk.empty() )
		{
                        //单调栈优化O(n)
			int j=stk.top();//由于单调性，j一定是r较小的一个 
			r[i]=min( r[i],max_r( i,j ) );//取可能半径中较小的 
			if( r[i] >= r[j] )//如果找到更大的半径，维护单调性 
			{
				stk.pop();
			}
			else//不用更改单调性，所以已经找到解，退出 
			{
				break;
			}
		}
		printf( "%.3lf\n",r[i] );
		stk.push( i ); 
	}
	return 0;
}

double max_r( int a,int b )
{
	return ( ( x[a]-x[b] )*( x[a]-x[b] )/4/r[b] );//推导的公式 
}

```
我真是个rj，推距离公式推半天