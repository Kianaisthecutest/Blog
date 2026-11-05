---
title: JOI-2024-2025-二次预选-Collision
date: 2026-11-05
slug: 题解/洛谷-or-Nsoj/JOI-2024-2025-二次预选-Collision
tags: [题解, 数学, 树套树, CDQ分治, 分块]
---

{/*truncate*/}

## Pre.一些无意义的蛐蛐

<h5>

没想到我有朝一日也能堆屎山堆完一道黑题啊，感觉这个题思维难度顶天了就是一个蓝但是代码不是一点的难写。

还有一点，今天是$2026·11·5$，$CCF$我草死你的马。

</h5>

## 正解思路

<h5>

如果存在一个点对 $(i,j)$，我们是可以直接算出来这两个点的碰撞次数的。

移动时间为 $t\in [0,T]$，先写成普通的判断式子：

$$
a_i+s_i\times t\equiv a_j+s_j\times t (\mod L)
$$

我们可以人为钦定顺序，令 $s_i\gt s_j$，那么这个同余式子可以写成这个样子：

$$
\exists k，(s_i​−s_j​)\times t=k\times L−(a_i​−a_j​)
$$

那么我们是可以得到 $k$ 的取值范围的，我们慢慢推导过来：

$$
\begin{aligned}
&0\le t=\frac{k\times L−(a_i​−a_j​)}{s_i​−s_j​}\le T\\
&0\le k\times L−(a_i​−a_j​)\le T\times (s_i​−s_j​)\\
&a_i​−a_j​\le k\times L\le T\times (s_i​−s_j​)+(a_i​−a_j)\\
&\frac{a_i-a_j}{L}\le k\le \frac{(a_i+s_i\times T)-(a_j+s_j\times T)}{L}
\end{aligned}
$$

因为 $t$ 和 $k$ 一一对应，所以我们只需要求出 $k$ 的个数就等价于合法的 $t$ 的个数。

那么我们继续做，做另一个同余式子转化我们的需要维护的值：

$$
\begin{aligned}
&a_i+s_i\times T=q_i\times L+r_i\\
&q_i=\lfloor \frac{a_i+s_i\times T}{L}\rfloor，r_i=(a_i+s_i\times T)(\mod L)
\end{aligned}
$$

这个就是一个简单带余除法，代入得到：

$$
\begin{aligned}
&k\le \frac{(q_i\times L+r_i)-(q_j\times L+r_j)}{L}=q_i+q_j+\frac{r_i-r_j}{L}\\
&k_{max}=\lfloor q_i+q_j+\frac{r_i-r_j}{L}\rfloor
\end{aligned}
$$

因为 $0\le r_i,r_j\lt L$，得到 $-L\lt r_i-r_j\lt L$，那么 $-1\lt \frac{r_i-r_j}{L}\lt 1$，进行一些分讨：

$$
\begin{aligned}
&若 r_i\ge r_j，则0\le \frac{r_i-r_j}{L}\lt 1，取整得到 k_{max}=q_i-q_j\\
&若 r_i\lt r_j，则-1\lt \frac{r_i-r_j}{L}\lt 0，取整得到 k_{max}=q_i-q_j-1
\end{aligned}
$$

那么得到 $k_{max}=q_i-q_j-[r_i\lt r_j]$ 这个上界了，继续来求下界。

因为 $0\le a_i,a_j\lt L$，那么 $-L\lt a_i-a_j\lt L$，得到 $-1\lt \frac{a_i-a_j}{L}\lt 1$，依旧进入分讨环节：

$$
\begin{aligned}
&若 a_i\ge a_j，则0\le \frac{a_i-a_j}{L}\lt 1，取整得到 k_{min}=0\\
&若 a_i\lt a_j，则-1\lt \frac{a_i-a_j}{L}\lt 0，取整得到 k_{min}=1
\end{aligned}
$$

那么 $k_{min}=[a_i\gt a_j]$，现在下界也得到了。

总数 $k_{max}-k_{min}+1$，答案就是：

$$
\begin{aligned}
&add=q_i-q_j-[r_i\lt r_j]-[a_i\gt a_j]+1\\
&add=q_i-q_j-[r_i\lt r_j]-[a_i\lt a_j]
\end{aligned}
$$

那么我们就得到了这个美丽的式子，我们就只需要维护这些东西就可以了。

首先是我们最开始钦定的 $s_i\gt s_j$，这个把所有读入拉下来排序离散化一下就可以了(很经典的排序降维操作)。

维护 $q_i-q_j$ 这项，那么求带单点修的前缀和丢树状数组或线段树就可以了。

其次的 $[r_i\lt r_j]$ 和 $[a_i\lt a_j]$ 就是很明显的一个动态逆序对了，搓个树套树就可以维护了。

整体的时间复杂度就是 $O((n+q)\times (\log^2(n+q)+\log(n+q)))$。

</h5>

<details>
<summary>附赠6K屎山代码</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair< int,int >
#define QWQ return 0;
#define QAQ return
#define pll pair< ll,ll >

const int N=1e5+10;
const int mod=1e9+7;

inline int lowbit( int x ){ QAQ x&-x; }

struct Binary
{
    int n;
    vector< vector< int > > v;
    vector< vector< int > > bit;
    vector< vector< ll  > > sum;

    inline void init( int _n )
    {
        n=_n;
        v  .assign( n+1,vector< int >() );
        bit.assign( n+1,vector< int >() );
        sum.assign( n+1,vector< ll  >() );
    }

    inline void build( int x,int y )
    { for( ;x<=n;x+=lowbit( x ) ) v[x].push_back( y ); }

    inline void finish()
    {
        for( int i=1;i<=n;i++ )
        {
            sort( v[i].begin(),v[i].end() );
            v[i].erase( unique( v[i].begin(),v[i].end() ),v[i].end() );
            bit[i].assign( v[i].size()+1,0 );
            sum[i].assign( v[i].size()+1,0 );
        }
    }

    inline void add( int x,int y,int z,ll w )
    {
        for( ;x<=n;x+=lowbit( x ) )
        {
            int p=lower_bound( v[x].begin(),v[x].end(),y )-v[x].begin()+1;
            for( ;p<bit[x].size();p+=lowbit( p ) )
                ( bit[x][p]+=z )%=mod, ( sum[x][p]+=w )%=mod;
        }
    }

    inline pll query( int x,int y )
    {
        ll cnt=0, val=0;
        for( ;x;x-=lowbit( x ) )
        {
            int p=upper_bound( v[x].begin(),v[x].end(),y )-v[x].begin();
            for( ;p;p-=lowbit( p ) )
                ( cnt+=bit[x][p] )%=mod, ( val+=sum[x][p] )%=mod;
        }
        QAQ { cnt,val };
    }
};

struct ASK
{
    int x, y, op;
}ask[N];

int a[N], s[N];
ll r[N], q[N];
bool vis[N];
map< pii,int > mp;

vector< ll > uni;
vector< int > una, unr;

inline int reidx( ll x )
{ QAQ lower_bound( uni.begin(),uni.end(),x )-uni.begin()+1; }

inline int reidxa( int x )
{ QAQ lower_bound( una.begin(),una.end(),x )-una.begin()+1; }

inline int reidxr( ll x )
{ QAQ lower_bound( unr.begin(),unr.end(),x )-unr.begin()+1; }

vector< ll > spd, spd_sum;

inline void spd_add( int x,int z,ll w )
{
    for( ;x<spd.size();x+=lowbit( x ) )
        ( spd[x]+=z )%=mod, ( spd_sum[x]+=w )%=mod;
}

inline pll spd_query( int x )
{
    ll cnt=0, sum=0;
    for( ;x;x-=lowbit( x ) )
        ( cnt+=spd[x] )%=mod, ( sum+=spd_sum[x] )%=mod;
    QAQ { cnt,sum };
}

int main()
{
    // freopen( "txt.in","r",stdin );
    // freopen( "txt.out","w",stdout );
    ios::sync_with_stdio( false );
    cin.tie( nullptr ); cout.tie( nullptr );
    int n, l, t, cnt=0;
    cin>>n>>l>>t;
    for( int i=1;i<=n;i++ ) cin>>a[i];
    for( int i=1;i<=n;i++ ) cin>>s[i];
    for( int i=1;i<=n;i++ )
        mp[{ a[i],s[i] }]=++cnt, vis[cnt]=true;
    int m;
    cin>>m;
    for( int i=1, x, y;i<=m;i++ )
    {
        cin>>x>>y;
        auto it=mp.find( { x,y } );
        if( it == mp.end() )
        {
            mp[{ x,y }]=++cnt;
            a[cnt]=x; s[cnt]=y;
            vis[cnt]=true;
            ask[i]={ x,y,0 };
        }
        else
        {
            int id=it->second;
            if( vis[id] ) vis[id]=false, ask[i]={ x,y,1 };
            else          vis[id]=true , ask[i]={ x,y,0 };
        }
    }

    for( int i=1;i<=cnt;i++ )
    {
        ll tmp=1ll*s[i]*t+a[i];
        r[i]=tmp%l;
        q[i]=tmp/l;
        uni.push_back( s[i] ); una.push_back( a[i] ); unr.push_back( r[i] );
    }
    sort( uni.begin(),uni.end() );
    uni.erase( unique( uni.begin(),uni.end() ),uni.end() );
    sort( una.begin(),una.end() );
    una.erase( unique( una.begin(),una.end() ),una.end() );
    sort( unr.begin(),unr.end() );
    unr.erase( unique( unr.begin(),unr.end() ),unr.end() );
    int sn=uni.size();
    Binary Bita, Bitr;
    Bita.init( sn ); Bitr.init( sn );
    for( int i=1, x;i<=cnt;i++ )
        x=reidx( s[i] ),
        Bita.build( x,reidxa( a[i] ) ), Bitr.build( x,reidxr( r[i] ) );
    Bita.finish(); Bitr.finish();
    spd.assign( sn+1,0 );
    spd_sum.assign( sn+1,0 );
    ll ans=0;
    for( int i=1;i<=n;i++ )
    {
        int x=reidx( s[i] ), ya=reidxa( a[i] ), yr=reidxr( r[i] );
        pll slower=spd_query( x-1 ), all=spd_query( sn ), upto=spd_query( x );
        ll slwcnt = slower.first              , slwsum = slower.second;
        ll fstcnt = all.first-upto.first      , fstsum = all.second-upto.second;
        ll slwrl  = Bitr.query( x-1,yr ).first, swlar  = Bita.query( x-1,ya ).first;
        ll slwrg  = slwcnt-slwrl              , slwag  = slwcnt-swlar;
        ll fstrl  = ( Bitr.query( sn,yr-1 ).first-Bitr.query( x,yr-1 ).first );
        ll fstal  = ( Bita.query( sn,ya-1 ).first-Bita.query( x,ya-1 ).first );
        ll cur=0;
        cur+=q[i]*slwcnt%mod-slwsum;
        cur-=slwrg; cur+=slwag;
        cur+=fstsum-q[i]*fstcnt%mod;
        cur-=fstrl; cur+=fstal;
        ans+=cur;
        Bita.add( x,ya,1,q[i] ); Bitr.add( x,yr,1,q[i] );
        spd_add( x,1,q[i] );
    }
    for( int i=1;i<=m;i++ )
    {
        int id=mp[{ ask[i].x,ask[i].y }];
        int x=reidx( s[id] ), ya=reidxa( a[id] ), yr=reidxr( r[id] );
        pll slower=spd_query( x-1 ), all=spd_query( sn ), upto=spd_query( x );
        ll slwcnt=slower.first                , slwsum = slower.second;
        ll fstcnt = all.first-upto.first      , fstsum = all.second-upto.second;
        ll slwrl  = Bitr.query( x-1,yr ).first, swlar  = Bita.query( x-1,ya ).first;
        ll slwrg  = slwcnt-slwrl              , slwag  = slwcnt-swlar;
        ll fstrl  = Bitr.query( sn,yr-1 ).first-Bitr.query( x,yr-1 ).first;
        ll fstal  = Bita.query( sn,ya-1 ).first-Bita.query( x,ya-1 ).first;
        ll cur=0;
        cur+=q[id]*slwcnt%mod-slwsum;
        cur-=slwrg; cur+=slwag;
        cur+=fstsum-q[id]*fstcnt%mod;
        cur-=fstrl; cur+=fstal;
        if( ask[i].op == 1 )
            ans-=cur,
            Bita.add( x,ya,-1,-q[id] ), Bitr.add( x,yr,-1,-q[id] ),
            spd_add( x,-1,-q[id] );
        else
            ans+=cur,
            Bita.add( x,ya,1,q[id] ), Bitr.add( x,yr,1,q[id] ),
            spd_add( x,1,q[id] );
        cout<<( ans%mod+mod )%mod<<"\n";
    }
    QWQ
}
```

</details>