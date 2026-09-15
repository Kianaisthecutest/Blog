---
title: 琪亚娜与小蛋糕
date: 2026-09-13
slug: 题解/洛谷-or-Nsoj/琪亚娜与OI比赛/C-琪亚娜与小蛋糕
tags: [题解, 动态规划, 斜率优化]
---

{/*truncate*/}

<h5>

感觉这题思维难度不算高，主要看~~阅读能力和~~斜优掌握。

首先先处理第一个吃蛋糕的问题，由题义：

$g_i=max_{j=1}^{i-1}( b_j\times a_i+g_j )$

再处理第二个爬山的问题，由题义：

$f_i=min_{j=1}^{i-1}( f_j+(g_i-g_j)^2 )$

所以容易得到一个$O(n^2)$代码得到$20pts$

然后我们发现这两个都是可以斜优的，写下来：

$g_i=max_{j=1}^{i-1}( b_j\times a_i+g_j )$

$y=g_i,\ k=b_j,\ x=a_i,\ b=g_j$

$f_i=min_{j=1}^{i-1}( f_j+(g_i-g_j)^2 )$

$f_i=min_{j=1}^{i-1}( f[j]+g[i]^2-2\times g[i]\times g[j]+g[j]^2 )$

$y=f_i,\ k=-2\times g[j],\ x=g[i],\ b=f[j]+g[j]^2$

对于第一个式子，双单增可以直接单调队列维护

而对于第二个式子，容易发现$g_i$也具有单调性，直接维护结束

时间复杂度：$O(n)$

</h5>

```cpp
/*
g[i]=b[j]*a[i]+g[j]
k=b[j], x=a[i], b=g[j]
初线段：k=1, b=0

f[i]=f[j]+( g[i]​−g[j] ​)^2
f[i]=f[j]+g[i]^2-2\times g[i]\times g[j]+g[j]^2
k=-2\times g[j], x=g[i], b=f[j]+g[j]^2
初线段：k=-2\times g[1], b=0+g[1]^2
*/
#include<bits/stdc++.h>  
using namespace std;  
#define ll long long  
#define pii pair< int,int >  
#define QWQ return 0;
#define QAQ return  
#define intt __int128
#define ull unsigned long long
#define uintt unsigned __int128

const int N=2e5+10; 

struct Fuction
{
    intt k, b;

    inline intt f( const intt &x )const
    { QAQ k*x+b; }

};

inline void mul128( uintt a,uintt b,uintt &hi,uintt &lo )
{
    ull al=( ull )a, ah=( ull )( a>>64 );
    ull bl=( ull )b, bh=( ull )( b>>64 );
    uintt p00=( uintt )al*bl;
    uintt p01=( uintt )al*bh;
    uintt p10=( uintt )ah*bl;
    uintt p11=( uintt )ah*bh;
    uintt mid=( p00>>64 )+( ull )p01+( ull )p10;
    lo=( p00&( ( ( uintt )1<<64 )-1 ) )|( mid<<64 );
    hi=p11+( p01>>64 )+( p10>>64 )+( mid>>64 );
}

inline bool mul_leq( intt a,intt b,intt c,intt d )
{
    int s1=( a<0 )^( b<0 );
    int s2=( c<0 )^( d<0 );
    if( s1 != s2 ) QAQ s1 > s2;
    uintt ua=( a < 0 ? ( uintt )-( a+1 )+1 : ( uintt )a );
    uintt ub=( b < 0 ? ( uintt )-( b+1 )+1 : ( uintt )b );
    uintt uc=( c < 0 ? ( uintt )-( c+1 )+1 : ( uintt )c );
    uintt ud=( d < 0 ? ( uintt )-( d+1 )+1 : ( uintt )d );
    uintt hi1,lo1,hi2,lo2;
    mul128( ua,ub,hi1,lo1 );
    mul128( uc,ud,hi2,lo2 );
    bool abs_leq=( hi1 != hi2 ? hi1 < hi2 : lo1 <= lo2 );
    QAQ ( s1 ? !abs_leq : abs_leq );
}

inline bool check( Fuction f1,Fuction f2,Fuction f3 )
{
    QAQ mul_leq( f3.b-f2.b,f1.k-f2.k,
                 f2.b-f1.b,f2.k-f3.k );
}

intt a[N], b[N], g[N], f[N];

inline intt read() 
{
    intt w=0;
    char ch=getchar();
    while( isdigit( ch ) )
    {
        w=w*10+ch-'0';
        ch=getchar();
    }
    QAQ w;
}

inline void print( intt num )
{
    if( num > 9 ) print( num/10 );
    putchar( num%10+'0' );
}

int main()  
{  
    // freopen( "big_sample2.in","r",stdin );  
    // freopen( "big_sample2.out","w",stdout );  
    // ios::sync_with_stdio( false );  
    // cin.tie( nullptr ); cout.tie( nullptr );
    int n=read();
    for( int i=1;i<=n;i++ ) a[i]=read();
    for( int i=1;i<=n;i++ ) b[i]=read();
    deque< Fuction > dq1;
    dq1.push_back( { 1,0 } );
    for( int i=1;i<=n;i++ )
    {
        intt x=a[i];
        while( dq1.size() >= 2 && dq1[0].f( x ) <= dq1[1].f( x ) ) dq1.pop_front();
        g[i]=dq1.front().f( x );
        Fuction nf={ b[i],g[i] };
        while( dq1.size() >= 2 && check( dq1[dq1.size()-2],dq1[dq1.size()-1],nf ) ) dq1.pop_back();
        dq1.push_back( nf );
        assert( g[i] >= g[i-1] );
    }
    deque< Fuction > dq2;
    dq2.push_back( { ( intt )-2*g[1],g[1]*g[1] } );
    for( int i=1;i<=n;i++ )
    {
        intt x=g[i];
        while( dq2.size() >= 2 && dq2[0].f( x ) >= dq2[1].f( x ) ) dq2.pop_front();
        f[i]=dq2.front().f( x )+x*x;
        Fuction nf={ ( intt )-2*g[i],f[i]+g[i]*g[i] };
        while( dq2.size() >= 2 && check( dq2[dq2.size()-2],dq2[dq2.size()-1],nf ) ) dq2.pop_back();
        dq2.push_back( nf );
    }
    print( g[n] );
    cout<<"\n";
    print( f[n] );
	QWQ   
}
```