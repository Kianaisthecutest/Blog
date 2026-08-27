---
title: FHQ-Treap
date: 2025-08-07
slug: 算法/FHQ-Treap
tags: [算法, 平衡树]
---

{/*truncate*/}

<h4>

FHQ-Treap，国际上多称为Zip-Treap，又称无旋平衡树，是由国人范浩强前辈整理得到的一种数据结构其实现功能与普通平衡树相同，但因为其并没有繁琐的旋转过程，易于实现，是算法竞赛上一个不错且常用的得分手段，但其常数相较于旋转的平衡树又偏大，所以可以算作平衡树的入门~~我的评价是不如STL的set~~

</h4>

***

## <font color="#DD0ADA">中心思想</font>

<h4>

通过大量的分裂与合并操作定位目标值并维护整棵树的性质

</h4>

***

## <font color="#DD0ADA">实现</font>

### 1.权值与关键码

<h4>

```
既然叫做平衡树，那么它就应该要满足BST性质和堆性质，那么我们如何实现呢？
<1>对于每个数，给它一个随机的关键码，利用关键码来实现堆性质，堆的随机值等价于随机打乱了有序序列插入的顺序，保证节点划分均匀尽量不会出现一条长链
<2>对于每个数，利用它的真实权值实现BST性质(中序遍历还原原数列)，使得对于每一个节点，它的左子树上的任意点的权值小于等于根的权值小于它的右子树上的任意点的权值
```

</h4>

### 2.分裂与合并

```cpp
//通过梅林旋转随机给每个点赋关键码以求得到的树尽可能均匀
mt19937 pol( 114514 );

struct FHQ_Treep
{
    int l, r, val, key, sz;
}ft[N];

int root, tot, T1, T2, T3;

//添加新的点
int New( int val )
{
    ft[++tot]={ 0,0,val,int( pol() ),1 };
    return tot;
}

//维护以u为根的子树的节点数量
void updata( int u )
{
    //要记得加上节点u
    ft[u].sz=ft[ft[u].l].sz+ft[ft[u].r].sz+1;
}

//以u为当前节点val为界，将树分裂为以x为根的权值均小于等于val的部分和以y为根权值均大于val的部分
void split( int u,int val,int &x,int &y )
{
    //访问的节点为0，即它的父亲为叶子节点
    if( !u )
    {
        x=y=0;
        return ;
    }
    //节点u的权值小于等于val，将它与其左子树连接至权值均小于等于val的部分的根的右边
    if( ft[u].val <= val )
    {
        x=u;
        //继续分裂
        split( ft[u].r,val,ft[u].r,y );
    }
    //节点u的权值大于val，将它与其右子树连接至权值均大于val的部分的根的左边
    else
    {
        y=u;
        //继续分裂
        split( ft[u].l,val,x,ft[u].l );
    }
    //更新分裂后的各节点的新的sz
    updata( u );
}

//将根分别为x与y的两个子树合并(需要保证x上的val均小于y)
int merge( int x,int y )
{
    //如果其中一颗子树已经到了叶节点0，则将另一颗子树整个接在此节点上
    if( !x || !y )
    {
        //小技巧，可以想一想为什么这么写
        return x+y;
    }
    //x的关键码大于等于y的关键码，将y整个接在x的左边
    if( ft[x].key >= ft[y].key )
    {
        ft[x].r=merge( ft[x].r,y );
        updata( x );
        return x;
    }
    //y的关键码大于x的关键码，将x整个接在y的右边
    else
    {
        ft[y].l=merge( x,ft[y].l );
        updata( y );
        return y;
    }
}
```

### 3.插入与删除

```cpp
//插入一个权值为val的数
void insert( int val )
{
    //先将原树分裂为以T1为根的权值均小于等于val-1的部分和以T2为根权值均大于等于val的部分
    split( root,val-1,T1,T2 );
    //再将T1与val合并后与T2合并，要记得更新根节点的值
    root=merge( merge( T1,New( val ) ),T2 );
}

//删除一个权值为val的数
void erase( int val )
{
    //先将原树分裂为以T1为根的权值均小于等于val-1的部分和以T2为根权值均大于等于val的部分
    split( root,val-1,T1,T2 );
    //再将T2分裂为以T2为根的权值均等于val的部分和以T3为根权值均大于val的部分T3
    split( T2,val,T2,T3 );
    //将T2的左右子树合并，相当于删除了根节点
    T2=merge( ft[T2].l,ft[T2].r );
    //再将三颗子树合并，同样要更新根节点的值
    root=merge( merge( T1,T2 ),T3 );
}
```

### 4.排名与位置

```cpp
//查询值为val的数的排名(多个输出最小)
int get_rank( int val )
{
    //先将原树分裂为以T1为根的权值均小于等于val-1的部分和以T2为根权值均大于等于val的部分
    split( root,val-1,T1,T2 );
    //因为左子树T1的值均小于val，所以排名就是左子树大小加一
    int ans=ft[T1].sz+1;
    //要记得将树还原并更新根节点的值
    root=merge( T1,T2 );
    return ans;
}

//查询第val名的数是什么
int kth( int val )
{
    int u=root;
    //无解时也要退出
    while( u )
    {
        //以u为节点的左子树的节点数量
        int ans=ft[ft[u].l].sz+1;
        //如果恰好等于val，则说明节点u的排名就是val
        if( ans == val )
        {
            //找到答案，退出循环
            break;
        }
        //如果小于val，则说明节点u的排名小于val，节点u对应的值也小于第val名的值
        if( ans < val )
        {
            //向右子树去寻找更大的节点
            u=ft[u].r;
            //等价于在左子树中找排名为(val-ans)的节点
            val-=ans;
        }
        //如果小于val，则说明节点u的排名大于val，节点u对应的值也大于第val名的值
        else
        {
            //向左子树去寻找更小的节点
            u=ft[u].l;
        }
    }
    return ft[u].val;
}
```

### 5.前驱与后继

```cpp
//查询值为val的数的前驱(前趋定义为小于且最大的数)
int get_pre( int val )
{
    //先将原树分裂为以T1为根的权值均小于等于val-1的部分和以T2为根权值均大于等于val的部分
    split( root,val-1,T1,T2 );
    //在左子树T1中寻找最大值
    int u=T1;
    //答案就是右链的端点
    while( ft[u].r ) u=ft[u].r;
    //要记得将树还原并更新根节点的值(似曾相识的话语)
    root=merge( T1,T2 );
    return ft[u].val;
}

//查询值为val的数的后继(前趋定义为大于且最小的数)
int get_nxt( int val )
{
    //先将原树分裂为以T1为根的权值均小于等于val的部分和以T2为根权值均大于val的部分
    split( root,val,T1,T2 );
    //在右子树T2中寻找最大值
    int u=T2;
    //答案就是左链的端点
    while( ft[u].l ) u=ft[u].l;
    //要记得将树还原并更新根节点的值(似曾相识的话语*2)
    root=merge( T1,T2 );
    return ft[u].val;
}
```

***

## <font color="#DD0ADA">时间复杂度</font>

<h4>

理想情况下，在节点分布均匀的情况下，它的每一个操作都能在$log(n)$的时间下完成，但是最坏情况下(大概率不会)会退化到$O(n)$

</h4>
