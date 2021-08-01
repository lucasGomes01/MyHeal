import { FormGroup } from '@angular/forms';

export function ComparacaoValidator(controLeNome: string, comparacaoNome: string) {
    return (formGroup: FormGroup) => {
        // Pega os nomes conforme os nomes que foram passados
        const controle = formGroup.controls[controLeNome];
        const comparacao = formGroup.controls[comparacaoNome];
        
        // Verifica se o primeiro campo atende todas as validações
        if (controle.errors) {
            return;
        }

        // Verifica se os campos são iguais 
        if (controle.value != comparacao.value) {
            // Se não for, cria o erro "comparacao"
            comparacao.setErrors({ comparacao: true });
        }else {
            // Caso contrário zera os erros.
            comparacao.setErrors(null);
        }
    };
}