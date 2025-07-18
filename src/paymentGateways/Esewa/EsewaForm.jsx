import esewaImage from "../../assets/esewaImage.png";
import { v4 as uuidV4 } from "uuid";
import { hashValue } from "./esewaCrypto";

const EsewaForm = ({ roomDetails }) => {
  const transactionUUID = uuidV4();
  console.log(roomDetails);

  const esewaSignature = hashValue(
    `total_amount=${roomDetails.price},transaction_uuid=${transactionUUID},product_code=EPAYTEST`
  );

  console.log(esewaSignature);
  return (
    <div>
      <form
        action='https://rc-epay.esewa.com.np/api/epay/main/v2/form'
        method='POST'
      >
        <input
          type='text'
          id='amount'
          name='amount'
          value={`${roomDetails.price}`}
          required
          hidden
        />
        <input
          type='text'
          id='tax_amount'
          name='tax_amount'
          value={"0"}
          required
          hidden
        />
        <input
          type='text'
          id='total_amount'
          name='total_amount'
          value={`${roomDetails.price}`}
          required
          hidden
        />
        <input
          type='text'
          id='transaction_uuid'
          name='transaction_uuid'
          value={transactionUUID}
          required
          hidden
        />
        <input
          type='text'
          id='product_code'
          name='product_code'
          value='EPAYTEST'
          required
          hidden
        />
        <input
          type='text'
          id='product_service_charge'
          name='product_service_charge'
          value='0'
          required
          hidden
        />
        <input
          type='text'
          id='product_delivery_charge'
          name='product_delivery_charge'
          value='0'
          required
          hidden
        />
        <input
          type='text'
          id='success_url'
          name='success_url'
          value='http://localhost:3000/esewa/response'
          required
          hidden
        />
        <input
          type='text'
          id='failure_url'
          name='failure_url'
          value='http://localhost:3000/room'
          required
          hidden
        />
        <input
          type='text'
          id='signed_field_names'
          name='signed_field_names'
          value='total_amount,transaction_uuid,product_code'
          required
          hidden
        />
        <input
          type='text'
          id='signature'
          name='signature'
          value={esewaSignature}
          required
          hidden
        />
        <button
          type='submit'
          style={{ border: "1px solid gray", background: "none" }}
        >
          <img src={esewaImage} alt='esewa' style={{ height: "60px" }} />
        </button>
      </form>
    </div>
  );
};
export default EsewaForm;
