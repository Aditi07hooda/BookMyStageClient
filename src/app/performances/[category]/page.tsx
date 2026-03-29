import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import ShopSectionCategoryWize from '@/components/shop/categoryWizeShop/ShopSectionCategoryWize';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

type Params = Promise<{ category: string }>;

const ShopPageCategoryWize = async ({ params }: { params: Params }) => {
    const {category} =  await params;

    return (
        <>
            <Wrapper>
                <main>
                    <Breadcrumb breadHome="Home" breadMenu="Shop"/>
                    <ShopSectionCategoryWize category={category}/>
                </main>
            </Wrapper>
        </>
    );
};

export default ShopPageCategoryWize;