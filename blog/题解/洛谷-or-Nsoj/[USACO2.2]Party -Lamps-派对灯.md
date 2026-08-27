---
title: 「USACO2.2」Party Lamps 派对灯
date: 2025-08-16
slug: 题解/洛谷-or-Nsoj/[USACO2.2]Party -Lamps-派对灯
tags: [题解, 进制, 状态压缩]
---

{/*truncate*/}

***<h2>找规律的一个题目（确定不是数学问题？）</h2>***

***<h2>不多叭叭，直接写思路</h2>***

***

***<h1>思路</h1>***

```
（经过计算机暴力模拟验证）灯的排列一定是循环的且是每6个灯为一组（循环如2）
数学验证为[1,2,2,3]=6;
```


```
对于灯泡亮暗为 000000，001110，010101，011011，100100，101010，110001，111111 的情况
最少只需要 1(op1)，2(op3+op4)，1(op2)，1(op4)，2(op1+op4)，1(op3)，2(op2+op4)，0 步
就可以完成目的
```

```
将操作分割，可以得到 
op1=op2+op3
op2=op1+op3
op3=op1+op2
op4=op1+op2+op3+op4
```

```
如果已经完成了目标且剩余步数为偶数
则最终一定可以完成目标（一直按一个按钮就行）
```

***<h3>然后快乐模拟+套公式就能AC了</h3>***


```cpp
//nm的给我做红温了，真是老太太的裹脚——又长又臭 
#include<bits/stdc++.h>
using namespace std;

int n, c, num, cnt;
int a[10], flag[10];
int lamp[9][7]={ { 0,0,0,0,0,0,0 },{ 0,0,0,0,0,0,0 },{ 0,0,0,1,1,1,0 },{ 0,0,1,0,1,0,1 },{ 0,0,1,1,0,1,1 },{ 0,1,0,0,1,0,0 },{ 0,1,0,1,0,1,0 },{ 0,1,1,0,0,0,1 },{ 0,1,1,1,1,1,1 } };
//即0，1，2，3，4，1+4，2+4，3+4的组合 
int s[9]={ 0,1,2,1,1,2,1,2,0 };

void sovel( int );
int change( int );
bool check( int );

int main(){
//	freopen( "txt.in","r",stdin );
	memset( flag,-1,sizeof( flag ) );
	scanf( "%d%d",&n ,&c );
	int x;
	while( scanf( "%d",&x ) && x != -1 )
	{
		flag[change( x )]=1;
	}
	while( scanf( "%d",&x ) && x != -1 )
	{
		flag[change( x )]=0;
	}
	bool have_solution=0;
	for ( int i=1;i<=8;i++ )
	{
		if ( check( i ) )
		{
			sovel( i );
			have_solution=true;
		} 
	}
	if ( !have_solution )
	{
		printf( "IMPOSSIBLE" );	
	} 
	return 0;
} 

void sovel( int number ){
	for (int i=1;i<=n;i++)
	{
		printf( "%d",lamp[number][change( i )] );
	}
	printf( "\n" );
}

int change( int number ){
	int num=number%6;
	if ( num == 0 )
	{
		return 6;
	} 
	return num;
}

bool check( int number ){
	if ( ( c == 2 && number == 4 ) || ( c == 3 && ( ( number == 2 ) || ( number == 5 ) || ( number == 7 ) ) ) || ( c == 1 && number == 8 ) )
	{
		return false;
	} 
	if ( s[number] > c )
	{
		return false;
	} 
	for ( int i=1;i<=6;i++ )
	{
		if ( flag[i] == -1 )
		{
			continue;
		} 
		if ( lamp[number][i] != flag[i] )
		{
			return false;
		} 
	}
	return true;
}
```