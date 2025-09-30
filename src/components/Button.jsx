"use client";

const Button = () => {
  return (
    <button
      className="btn btn-ghost"
      onClick={() => {
        alert("Here we go!");
      }}
    >
      Click me
    </button>
  );
};

export default Button;
