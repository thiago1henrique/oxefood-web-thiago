import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function Home() {
  return (
    <div>
      <MenuSistema tela="home" />
      <div style={{ marginTop: "13%" }}>
        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Image src="/logo-IFPE.png" size="large" />
              </Grid.Column>
              <Grid.Column>
                Bem vindo ao sistema <strong>OxeFood</strong> ! <br />
                Este sistema foi desenvolvido na disciplina de <br /> Desenvolvimento
                para WEB IV. <br /> <br />
                Para acessar o código da <strong>API</strong> do sistema,
                acesse:{" "} <br />
                <a
                  href="https://github.com/thiago1henrique/oxefood-api-thiago2"
                  target="_blank"
                >
                  {" "}
                    https://github.com/thiago1henrique/oxefood-web-thiago#{" "}
                </a>{" "}
                <br /> <br />
                Para acessar o código do <strong>Módulo WEB</strong>, acesse:{" "} <br />
                <a
                  href="https://github.com/thiago1henrique/oxefood-web-thiago#"
                  target="_blank"
                >
                  {" "}
                    https://github.com/thiago1henrique/oxefood-web-thiago#{" "}
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
