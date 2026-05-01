
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import ShopMain from "@/components/shop/ShopMain";
import Wrapper from "@/layout/DefaultWrapper";

const Performance = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <Breadcrumb breadHome="Home" breadMenu="Performance"/>
                    <ShopMain />
                </main>
            </Wrapper>
        </>
    );
}

export default Performance