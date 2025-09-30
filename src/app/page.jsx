"use client"
import { useState } from "react";
import Modal from "@/components/Modal/Modal";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="content">
      <h1>Main</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni nostrum dolore facere, maxime iusto harum saepe qui quia natus iste eum deleniti provident perferendis nisi accusamus. Vel, ipsam nemo. Deleniti!</p>
      <button className="btn btn-modal" onClick={() => setIsModalOpen(true)}>Принять участие</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
