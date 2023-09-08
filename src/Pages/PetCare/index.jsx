import React from "react";

function PetCare() {
  // Sample data for schools
  const petCares = [
    {
      name: "Clã do Cão",
      imageSrc:
        "https://media.timeout.com/images/105771605/750/562/image.jpg",
      description: "É um hotel no Alentejo, uma creche em Loures, mas tem partidas sempre marcadas em vários pontos da zona de Lisboa. Um projecto que juntou as veterinárias Luisa Fechner e Jessica Barbeito, o treinador Pedro Moleiro e o gesto Carlos Miguel, todos confessos “tutores-galinha de cães super-mimados”. O hotel, no centro do Alentejo, integra dois parques ao ar livre de 5000m2, um para cães de grande porte e outro para cães até aos 10kg. Durante o dia, todos têm direito a uma série de actividades que incluem caminhadas pela quinta, onde há bosques e prados e também uma piscina para cães. À noite dormem dentro de casa – onde também fica os monitores – em camas de cão ou sofás, como preferirem, é como se estivessem mesmo em casa. A creche, localizada numa encosta entre Loures e Caneças a poucos minutos de Lisboa, funciona num terreno bucólico com mais de 3000m2 vedados, onde existe uma zona coberta de 100m2 para quando o tempo não está bom para brincadeiras.",
    },
    {
      name: "Instituto do Animal",
      imageSrc:
        "https://media.timeout.com/images/103696381/1920/1080/image.jpg",
      description: "O Instituto do Animal é uma escola de formação para animais de companhia, donos e profissionais. Além de ter sido a primeira creche canina de Lisboa. Sílvia Machado é a directora e fundadora do Instituto do Animal, um projecto cujo primeiro propósito é oferecer formação tanto a cães, como a donos e profissionais da área. Em Outubro de 2016 começou também a funcionar como creche, tornando-se no primeiro espaço de Lisboa a oferecer este tipo de serviço. Localizado no Jardim do Poço do Bispo, em Marvila, actua na área da Grande Lisboa, disponibilizando um serviço de transporte que vai buscar os animais a casa sempre que os pais babados precisarem. Treino para andar à trela sem puxar,  obediência à chamada e acções de sociabilização são alguns dos programas de que pode usufruir. Para entrarem, os cães passam primeiro por uma entrevista em que é avaliado o comportamento e outros factores. Além disto, os requisitos de entrada para a creche são: ter idade igual ou superior a 3 meses, vacinas em dia e desparasitação feita há menos de 3 meses.",
    },
    {
      name: "Recreio Canino",
      imageSrc:
        "https://media.timeout.com/images/105250717/750/562/image.jpg",
      description: "Faça chuva ou faça sol, o seu amigo de quatro patas vai estar sempre bem entregue no espaço deste Recreio Canino, um hotel/creche em Loures cheio de espaço para as brincadeiras dos hóspedes. O fundador (e director técnico) é Fernando Silva, que com ele trouxe experiência e formação cinotécnica e uma filosofia baseada na liberdade dos animais, ou seja, é deixá-los brincar uns com os outros. Seja em regime de hotel ou em regime de creche, há sempre presença humana a supervisionar a matilha para intervir quando necessário e raramente são utilizados brinquedos ou bolas que possam suscitar conflito entre os cães. Um dos serviços que distingue o Recreio Canino é a possibilidade de o deixar lá por apenas umas horas.",
    },
    {
      name: "SweetPet",
      imageSrc:
        "https://media.timeout.com/images/105250702/750/562/image.jpg",
      description: "Se morar ou trabalhar para os lados de Cascais é aqui que se tem de dirigir para deixar o cão em boa companhia. A creche é apenas um dos serviços disponíveis no Sweet Pet, um hotel e creche criado por Camila Fassi em 2014. Tem um ambiente familiar e aqui só entram cães esterilizados (a partir dos dez meses), já que a experiência da equipa da casa diz que os cães não castrados têm a mania de marcar território. As cadelas com o cio também ficam à porta e todos têm de passar por uma avaliação do comportamento, fundamental para um ameno convívio em contexto de creche.",
    },
    {
      name: "Malu",
      imageSrc:
        "https://malupetcare.pt/wp-content/uploads/2022/11/706f6a23-5c2f-4c22-b3db-8a0438097b08-1024x379.jpg",
      description: "Em 2020, ainda pré-pandemia, decidimos criar um projecto de acessórios para animais, a Malü Pet Wear. Fomos conhecendo vários patudos e donos que algumas vezes nos pediram ajuda e foi assim que começamos a realizar este tipo de Serviços. Depois de 2 anos de Malü Pet Wear e com um amor cada vez mais crescente pelos nossos amigos de 4 patas, decidimos criar a Malü Pet Care. "
    },
  ];

  return (
    <div className="petCares-page">
      <h2 style={{ color: "black" }}>Pet Cares</h2>
      <div className="petCare-list">
        {petCares.map((petCare, index) => (
          <div key={index} className="petCare-card">
            <img src={petCare.imageSrc} alt={petCare.name} className="petCare-image" />
            <div style={{ color: "black" }} className="petCare-details">
              <h3 className="petCare-name">{petCare.name}</h3>
              <p className="petCare-description">{petCare.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetCare;