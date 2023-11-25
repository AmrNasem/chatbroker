import { Container } from "react-bootstrap";
import ProductItem from "./ProductItem";

const MostRented = () => {
  return (
    <Container className="my-5">
      <h4 className="mb-4">الأكثر إيجارًا</h4>
      <div className="d-flex gap-4 py-3 px-2 overflow-auto remove-scrollbar">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </Container>
  );
};

export default MostRented;
