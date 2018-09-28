import HomeComponent from "../Components/Home/HomeComponent"
import ProductComponent from "../Components/Products/ProductComponent"
import ProductCreateComponent from "../Components/Products/ProductCreateComponent"
import ProductEditComponent from "../Components/Products/ProductEditComponent"

export default [

    {path : '/', component : HomeComponent},
    {path : "/product", component : ProductComponent},
    {path : "/product/create", component : ProductCreateComponent},
    {path : "/product/:id/edit", name : "productEdit", component : ProductEditComponent, props: true}

]