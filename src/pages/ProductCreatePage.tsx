import ProductForm from "../components/ProductForm";

const ProductCreatePage = () => {
  // tar emot data från ProductForm
  // API-anropet kommer senare i FE-20B
  const handleSubmit = (formData: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    console.log("Produktdata:", formData); // när FE-20B kopplar ihop API:t ska denna ersättas
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Skapa produkt</h1>
      <ProductForm onSubmit={handleSubmit} />
    </main>
  );
};
export default ProductCreatePage;
