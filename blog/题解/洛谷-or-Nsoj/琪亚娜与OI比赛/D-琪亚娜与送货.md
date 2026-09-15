---
title: 琪亚娜与送货
date: 2026-09-15
slug: 题解/洛谷-or-Nsoj/琪亚娜与OI比赛/D-琪亚娜与送货
tags: [题解, 线段树, 树状数组, 树套树, 树链剖分, LCA, 离线处理, 分块]
---

{/*truncate*/}

<h5>

思路很 $naive$ 的毒瘤大 $DS$

首先我们看一下我们有那些操作：

<span>&lt;1&gt;</span> 树上区间查询大于等于某个数的数量

<span>&lt;2&gt;</span> 树上单点修改

<span>&lt;3&gt;</span> 树上区间加

那么<span>&lt;2&gt;</span>这个就是很明显的一个树上数据结构的单点修改

其次呢，<span>&lt;1&gt;</span>首先查询大于等于某个数的数量很明显的一个权值线段树或者树状数组

因为要树上区间操作所以可以套一个树剖+树套树

最后的<span>&lt;1&gt;</span>统计答案就是很简单的一个树上差分了

时间复杂度：$O(qlog^3n)$

但是 $AI$ 写了一个 $O(\frac{n}{\sqrt n}logn+\sqrt nlogn)$的随机数据下更优分块做法，但是理论可以卡掉

</h5>

```cpp
树套树
/*
毒瘤大DS
首先树剖一下cao一颗权值线段树
其次发现区间查询大于等于某个数的个数，好的树套树
最后计算贡献就是写一个树上点差分就行
*/
#include<bits/stdc++.h>  
using namespace std;
#define ll long long
#define pii pair< int,int >  
#define QWQ return 0;
#define QAQ return  

const int N=1e5+10; 

int n, id;
int sumw[N], nw[N];
int siz[N], dep[N], fa[N];
int mson[N], top[N], dfn[N], idx[N];
ll del[N];
vector< int > w[N], tmp[N];
vector< int > rode[N];

struct OPERATOR
{
    int op;
    int x, y, z;
}ask[N];

struct Binary1
{
    vector< int > uni, bit;

    inline static int lowbit( int x ){ QAQ x&-x; }

    inline void init( vector< int > v )
    {
        uni=move( v );
        sort( uni.begin(),uni.end() );
        uni.erase( unique( uni.begin(),uni.end() ),uni.end() );
        bit.assign( uni.size()+1,0 );
    }

    inline void add1( int x,int y )
    { for( ;x<bit.size();x+=lowbit( x ) ) bit[x]+=y; }

    inline int query1( int x )
    {
        int ans=0;
        for( ;x;x-=lowbit( x ) ) ans+=bit[x];
        QAQ ans;
    }

    inline void add2( int x,int v )
    {
        int p=lower_bound( uni.begin(),uni.end(),x )-uni.begin()+1;
        add1( p,v );
    }

    inline int query2( int x )
    {
        if( uni.empty() ) QAQ 0;
        int p=lower_bound( uni.begin(),uni.end(),x )-uni.begin();
        QAQ query1( uni.size() )-query1( p );
    }
};

struct Binary2
{
    Binary1 bit1[N];

    inline static int lowbit( int x ){ QAQ x&-x; }

    inline void init()
    {
        for( int x=1;x<=n;x++ ) for( int i=dfn[x];i<=n;i+=lowbit( i ) )
        for( auto &y:w[x] )     tmp[i].push_back( y );
        for( int i=1;i<=n;i++ ) bit1[i].init( move( tmp[i] ) );
    }

    inline void add( int x,int y,int z )
    { for( ;x<=n;x+=lowbit( x ) ) bit1[x].add2( y,z ); }

    inline int query1( int x,int y )
    {
        int ans=0;
        for( ;x;x-=lowbit( x ) ) ans+=bit1[x].query2( y );
        QAQ ans;
    }

    inline int query2( int l,int r,int y )
    { QAQ query1( r,y )-query1( l-1,y ); }

}bit2;

inline void dfs1( int p,int Fa )
{
    siz[p]=1;
    dep[p]=dep[Fa]+1, fa[p]=Fa;
    for( auto &x:rode[p] ) if( x != Fa )
    {
        dfs1( x,p );
        siz[p]+=siz[x];
        if( siz[x] > siz[mson[p]] ) mson[p]=x;
    }
}

inline void dfs2( int p,int t )
{
    top[p]=t;
    dfn[p]=++id; idx[id]=p;
    if( !mson[p] ) QAQ;
    dfs2( mson[p],t );
    for( auto &x:rode[p] )
        if( x != fa[p] && x != mson[p] )dfs2( x,x );
}

inline int lca( int x,int y )
{
    while( top[x] != top[y] )
        if( dep[top[x]] > dep[top[y]] ) x=fa[top[x]];
        else                            y=fa[top[y]];
    QAQ ( dep[x] < dep[y] ? x : y );
}

inline int lcaquery( int x,int y,int z )
{
    int ans=0;
    while( top[x] != top[y] )
    {
        if( dep[top[x]] < dep[top[y]] ) swap( x,y );
        ans+=bit2.query2( dfn[top[x]],dfn[x],z );
        x=fa[top[x]];
    }
    if( dep[x] > dep[y] ) swap( x,y );
    ans+=bit2.query2( dfn[x],dfn[y],z );
    QAQ ans;
}

inline void Delta( int x,int y,ll v )
{
    int LCA=lca( x,y );
    del[x]+=v; del[y]+=v;
    del[LCA]-=v; del[fa[LCA]]-=v;
}

inline void dfs3( int p,int Fa )
{
    for( auto &x:rode[p] ) if( x != Fa )
        dfs3( x,p ), del[p]+=del[x];
}

int main()  
{  
    // freopen( "big_sample2.in","r",stdin );  
    // freopen( "big_sample2.out","w",stdout );  
    ios::sync_with_stdio( false );  
    cin.tie( nullptr ); cout.tie( nullptr );
    cin>>n;
    for( int i=1;i<=n;i++ )
        cin>>nw[i], w[i].push_back( nw[i] ),
        sumw[i]+=nw[i]; 
    for( int i=1, u, v;i<n;i++ )
        cin>>u>>v, 
        rode[u].push_back( v ), rode[v].push_back( u );
    dfs1( 1,0 ); dfs2( 1,1 );
    int q;
    cin>>q;
    for( int i=1;i<=q;i++ )
    {
        cin>>ask[i].op;
        if( ask[i].op == 1 )
        {
            cin>>ask[i].x>>ask[i].y;
            sumw[ask[i].x]+=ask[i].y;
            w[ask[i].x].push_back( sumw[ask[i].x] );
        }
        else cin>>ask[i].x>>ask[i].y>>ask[i].z;
    }
    bit2.init();
    for( int i=1;i<=n;i++ ) bit2.add( dfn[i],nw[i],1 );
    int lst=0;
    for( int i=1;i<=q;i++ )
    {
        auto &[op,x,y,z]=ask[i];
        if( op==1 )
        {            
            bit2.add( dfn[x],nw[x],-1 );
            nw[x]+=y;
            bit2.add( dfn[x],nw[x], 1 );
        }
        else
        {
            z^=lst;
            lst=lcaquery( x,y,z );
            Delta( x,y,lst );
        }
    }
    dfs3( 1,0 );
    for( int i=1;i<=n;i++ ) cout<<del[i]<<" ";
	QWQ   
}
```

```cpp
分块
#include<bits/stdc++.h>
using namespace std;

const int MAXN=100005;
const int S=320;

int n,q;
int w[MAXN];
int fa[MAXN],dep[MAXN],sz[MAXN],son[MAXN];
int top[MAXN],dfn[MAXN],id[MAXN];
int timer;
long long add[MAXN];
vector<int> g[MAXN];
vector<int> block[MAXN];

void update_block(int x,int old_value,int new_value)
{
	int b=(dfn[x]-1)/S;
	vector<int>::iterator it=lower_bound(block[b].begin(),block[b].end(),old_value);
	block[b].erase(it);
	block[b].insert(lower_bound(block[b].begin(),block[b].end(),new_value),new_value);
}

int query_range(int l,int r,int upper)
{
	if(l>r)
		swap(l,r);
	int res=0;
	while(l<=r&&(l-1)%S!=0)
	{
		if(w[id[l]]>=upper)
			res++;
		l++;
	}
	while(l+S-1<=r)
	{
		int b=(l-1)/S;
		res+=(int)(block[b].end()-lower_bound(block[b].begin(),block[b].end(),upper));
		l+=S;
	}
	while(l<=r)
	{
		if(w[id[l]]>=upper)
			res++;
		l++;
	}
	return res;
}

int query_path(int u,int v,int upper,int &lca)
{
	int res=0;
	while(top[u]!=top[v])
	{
		if(dep[top[u]]<dep[top[v]])
			swap(u,v);
		res+=query_range(dfn[top[u]],dfn[u],upper);
		u=fa[top[u]];
	}
	if(dep[u]>dep[v])
		swap(u,v);
	res+=query_range(dfn[u],dfn[v],upper);
	lca=u;
	return res;
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	
	cin>>n;
	for(int i=1;i<=n;i++)
		cin>>w[i];
	
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		g[u].push_back(v);
		g[v].push_back(u);
	}
	
	vector<int> order;
	order.reserve(n);
	vector<int> st;
	st.push_back(1);
	fa[1]=0;
	dep[1]=1;
	while(!st.empty())
	{
		int u=st.back();
		st.pop_back();
		order.push_back(u);
		for(int v:g[u])
		{
			if(v==fa[u])
				continue;
			fa[v]=u;
			dep[v]=dep[u]+1;
			st.push_back(v);
		}
	}
	
	for(int i=n-1;i>=0;i--)
	{
		int u=order[i];
		sz[u]++;
		if(fa[u])
		{
			sz[fa[u]]+=sz[u];
			if(son[fa[u]]==0||sz[u]>sz[son[fa[u]]])
				son[fa[u]]=u;
		}
	}
	
	st.clear();
	st.push_back(1);
	top[1]=1;
	while(!st.empty())
	{
		int u=st.back();
		st.pop_back();
		int tp=top[u];
		for(int x=u;x;x=son[x])
		{
			top[x]=tp;
			dfn[x]=++timer;
			id[timer]=x;
			for(int v:g[x])
			{
				if(v!=fa[x]&&v!=son[x])
				{
					top[v]=v;
					st.push_back(v);
				}
			}
		}
	}
	
	int block_count=(n+S-1)/S;
	for(int i=1;i<=n;i++)
		block[(dfn[i]-1)/S].push_back(w[i]);
	for(int i=0;i<block_count;i++)
		sort(block[i].begin(),block[i].end());
	
	cin>>q;
	int cnt=0;
	while(q--)
	{
		int op;
		cin>>op;
		if(op==1)
		{
			int x,y;
			cin>>x>>y;
			int old_value=w[x];
			w[x]+=y;
			update_block(x,old_value,w[x]);
		}
		else
		{
			int u,v,upper;
			cin>>u>>v>>upper;
			upper^=cnt;
			
			int lca;
			cnt=query_path(u,v,upper,lca);
			
			add[u]+=cnt;
			add[v]+=cnt;
			add[lca]-=cnt;
			if(fa[lca])
				add[fa[lca]]-=cnt;
		}
	}
	
	for(int i=n-1;i>0;i--)
		add[fa[order[i]]]+=add[order[i]];
	
	for(int i=1;i<=n;i++)
	{
		if(i>1)
			cout<<" ";
		cout<<add[i];
	}
	cout<<"\n";
	
	return 0;
}
```