import React, { useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { ScrollView } from 'react-native'
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle'
import TextInput from 'ui/components/inputs/TextInput/TextInput'
import { TextInputMask } from 'react-native-masked-text'
import Button from 'ui/components/inputs/Button/Button'
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation'
import { FormContainer, TextContainer, ErrorText, ResponseContainer } from '@styles/pages/encontrar-diarista.styled'
import useIndex from 'data/hooks/pages/useIndex.page'
import useEncontrarDiarista from 'data/hooks/pages/useEncontrarDiarista.page.mobile'

const EncontrarDiaristas: React.FC = () => {
  const {colors} = useTheme()
  
  const {
    cep, setCep, cepValido,
    buscarProfissionais, busca,
    diaristas, restantes,
    carregando,
    erro,
  } = useIndex(),
  {cepAutomatico} = useEncontrarDiarista()

  useEffect(() => {
    if (cepAutomatico && !cep) {
      setCep(cepAutomatico)
      buscarProfissionais(cepAutomatico)
    }
  }, [cepAutomatico])

  return (
    <ScrollView>
      <PageTitle 
        title={'Conheca os profissionais'}
        subtitle={'Preencha seu CEP e veja todos os profissionais na sua região'}
      />

      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep} 
          type={'custom'}
          options={{
            mask: '99.999-999'
          }}
          customTextInput={TextInput}
          customTextInputProps={{
            label: 'Digite seu Cep'
          }}
        />
        {erro ? <ErrorText>{erro}</ErrorText> : null}
        <Button 
          mode={'contained'} 
          style={{marginTop: 32}} 
          color={colors.accent}
          disabled={!cepValido || carregando}
          onPress={() => buscarProfissionais(cep)}
          loading={carregando}
        >
          Buscar
        </Button>
      </FormContainer>

      {busca && 
        (diaristas.length > 0 ? (
          <ResponseContainer>
            {diaristas.map((item, index) => (
              <UserInformation 
                key={index}
                name={item.nome_completo}
                rating={item.reputacao || 0}
                picture={item.foto_usuario || ''}
                description={item.cidade}
                darker={index % 2 === 1}
              />
            ))}

            {restantes > 0 && 
              <TextContainer>
                ...e mais {restantes} {restantes > 1 ? 'profissionais atendem' : 'profissional atende'}  na sua região
              </TextContainer>
            }

            <Button color={colors.accent} mode={'contained'}>
              Contratar um profissional
            </Button>
          </ResponseContainer>
        ) : (
          <TextContainer>
            Ainda não temos nenhum profissional disponível em sua região
          </TextContainer>) 
        )
      }

    </ScrollView>
  )
}

export default EncontrarDiaristas;