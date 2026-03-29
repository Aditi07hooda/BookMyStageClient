"use client";
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import ShopSectionSubCategoryWise from "@/components/shop/subcategory-product/ShopSectionSubCategoryWise";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

type Params = Promise<{ id: string }>;

const SubCategoryWizeProductPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <>
      <Wrapper>
        <main>
          <Breadcrumb breadHome="Home" breadMenu="Shop" />
          <ShopSectionSubCategoryWise id={id} />
        </main>
      </Wrapper>
    </>
  );
};

export default SubCategoryWizeProductPage;
