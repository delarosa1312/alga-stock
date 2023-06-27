import React, { useState } from "react";
import "./App.css";
import Header from "../Header";
import Container from "../../shared/Container";
import Table, { TableHeader } from "../../shared/Table";
import Products, { Product } from "../../shared/Table/Table.mockdata";
import ProductForm, { ProductCreator } from "../Products/ProductForm";
import Swal from "sweetalert2";

const headers: TableHeader[] = [
  {
    key: "id",
    value: "#",
  },
  {
    key: "name",
    value: "Product",
  },
  {
    key: "price",
    value: "Price",
    right: true,
  },
  {
    key: "stock",
    value: "Available Stock",
    right: true,
  },
];

function App() {
  const [products, setProducts] = useState(Products);
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(
    undefined
  );

  const handleProductSubmit = (product: ProductCreator) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...product,
      },
    ]);
  };

  const handleProductUpdate = (newProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === newProduct.id ? newProduct : product
      )
    );
    setUpdatingProduct(undefined);
  };

  const handleProductEdit = (product: Product) => {
    setUpdatingProduct(product);
  };
  const handleProductDetail = (product: Product) => {
    Swal.fire(
      "Product Details",
      `The Product ${product.name} costs $${product.price}.</br> We have ${product.stock} units available in stock.`,
      "info"
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: `You want to delete the ${product.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#09f",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete ${product.name}`,
    }).then((result) => {
      if (result.value) {
        deleteProduct(product.id);
        Swal.fire("Deleted!", "Your Product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <ProductForm
          form={updatingProduct}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
        <Table
          headers={headers}
          data={products}
          enableActions
          onDelete={handleProductDelete}
          onDetail={handleProductDetail}
          onEdit={handleProductEdit}
        />
      </Container>
    </div>
  );
}

export default App;
