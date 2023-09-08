import React from "react";

function SchoolsPage() {
  // Sample data for schools
  const schools = [
    {
      name: "Alfa Dog Centro Canino",
      imageSrc:
        "https://www.alfadog.pt/ficheiros/dinamicos/multimedia/imagem/areas/home/__fmhidden__94a465af1af362030f91f062df6ba4be/008db1bfb9f73362b808984d3d147537.jpg?v=1648134910",
      description: "ALFADOG CENTRO CANINO. Treinar o Seu Cão Não Tem De Ser Complicado. Marque um avaliação gratuita e sem compromisso com os nossos especialistas.",
    },
    {
      name: "Busca",
      imageSrc:
        "http://www.treinodecaes.pt/wp-content/uploads/2016/03/logo_preto.png",
      description: "O Respeito e a Obediência não se impõem. Ganham-se através da educação, do treino e da dedicação.",
    },
    {
      name: "Campus Dog, Centro de Treino Canino",
      imageSrc:
        "https://static.wixstatic.com/media/7c234e_f024197d469b457abb4a60de4d61121f~mv2.png/v1/crop/x_425,y_333,w_3965,h_3107/fill/w_273,h_214,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20campus%20dog-02.png",
      description: "Disciplina, Obediência e Satisfação. Venha experimentar uma aula connosco!",
    },
    {
      name: "Carlos Cordeiro, Escola de Cães",
      imageSrc:
        "https://images.ctfassets.net/bph2t5m4dyx8/4BxeYms9JUBb7eMEM5aixH/33d9f83c02985562fec60e3867b3a091/PHOTO-2022-08-15-10-04-48.jpg",
      description: "TEMOS UM MÉTODO DE TREINO QUE FAZ TODA A DIFERENÇA. Temos uma Matilha própria para o treino. Cada caso é avaliado de forma individual. O treino é feito no domicílio ou na rua. O Dono está sempre envolvido.",
    },
  ];

  return (
    <div className="schools-page">
      <h2 style={{ color: "black" }}>Schools</h2>
      <div className="school-list">
        {schools.map((school, index) => (
          <div key={index} className="school-card">
            <img
              src={school.imageSrc}
              alt={school.name}
              className="school-image"
            />
            <div style={{ color: "black" }} className="school-details">
              <h3 className="school-name">{school.name}</h3>
              <p className="school-description">{school.description}</p>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchoolsPage;