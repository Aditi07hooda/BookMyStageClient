
import ShopDetailsMain from "@/components/shop-details/ShopDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";

type Params = Promise<{ id: number }>;

const ShoDetailsDynamic = async ({ params }: { params: Params }) => {
    const { id } = await params;

    return (
        <>
            <Wrapper>
                <main>
                    
                    <ShopDetailsMain id={id}/>
                </main>
            </Wrapper>
        </>
    );
}

export default ShoDetailsDynamic