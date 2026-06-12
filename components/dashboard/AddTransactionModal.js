import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../lib/api";
import toast from "react-hot-toast";

/**
 * Validation schema
 */
const schema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  category: z.string().min(1),
  note: z.string().optional()
});

/**
 * Add transaction modal
 */
export default function AddTransactionModal({ onClose, refresh }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  /**
   * Submit transaction
   */
  const onSubmit = async (data) => {
    try {
      await api.post("/transactions", data);

      toast.success("Transaction added!");
      refresh();
      onClose();
    } catch (err) {
      toast.error("Failed to add transaction");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("type")}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            {...register("amount", { valueAsNumber: true })}
          />
          <p>{errors.amount?.message}</p>

          <input placeholder="Category" {...register("category")} />

          <input placeholder="Note" {...register("note")} />

          <button type="submit" className="btn-primary">
            Save
          </button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  }
};