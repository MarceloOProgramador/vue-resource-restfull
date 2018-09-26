import HomeComponent from "../Components/Home/HomeComponent"
import ProductComponent from "../Components/Products/ProductComponent"
import ProductCreateComponent from "../Components/Products/ProductCreateComponent"

export default [

    {path : '/', component : HomeComponent},
    {path : "/product", component : ProductComponent},
    {path : "/product/create", component : ProductCreateComponent}

]