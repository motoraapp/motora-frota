# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 10/11/2026, 19:32:47. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7100 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
160: <!-- Header Principal -->
174: <!-- Controles do Header -->
176: <!-- Botão Status Online/Offline (Motorista) -->
184: <!-- Ativar Notificações -->
189: <!-- Temas -->
194: <!-- Logout Button -->
203: <!-- Conteúdo Principal -->
206: <!-- TELA DE LOGIN -->
207: #secLogin
240: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
241: #secDemoEscolha
256: <!-- PAINEL DO MOTORISTA -->
257: #secDriverPanel
259: <!-- Card do Veículo Vinculado -->
274: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
284: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
289: <!-- Aviso: nova versão do app Android -->
292: <!-- Aviso vermelho: notificações desligadas -->
295: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
299: <!-- Aviso de Pix / pagamento pendente -->
302: <!-- Navegação de Abas -->
320: <!-- Conteúdo das Abas Motorista -->
323: <!-- Aba CRLV-e -->
324: #tabDrvCrlv
329: <!-- Renderizado dinamicamente -->
333: <!-- Aba Contrato -->
334: #tabDrvContract
344: <!-- Renderizado dinamicamente -->
348: <!-- Aba Vistoria -->
349: #tabDrvInspection
356: <!-- Aba Pagamento -->
357: #tabDrvPayment
370: <!-- Caução e multas do motorista -->
372: <!-- Valor e descrição da cobrança -->
382: <!-- Seção Pix -->
395: <!-- QR Code Renderizado aqui -->
420: <!-- Seção Upload de Comprovante -->
437: <!-- Lista de comprovantes -->
447: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
448: #secMasterPanel
481: <!-- Aviso: falta criar a tabela dos termos no banco -->
484: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
486: <!-- Lista de Veículos -->
502: <!-- Renderizado via JS -->
509: <!-- Form de Adicionar Veículo -->
543: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
549: <!-- Lista de Motoristas -->
566: <!-- Renderizado via JS -->
573: <!-- Form de Adicionar Motorista -->
668: <!-- Barra de baixo do dono (só no design novo) -->
678: <!-- MODAL PRIMEIRO LOGIN -->
679: #modalFirstLogin
713: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
714: #modalNotif
727: <!-- MODAL VISTORIA (MASTER) -->
728: #modalInspection
741: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
742: #modalSettings
801: <!-- MODAL TEMAS -->
802: #modalThemes
813: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
814: #modalCreds
829: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
830: #modalDriverFile
894: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
909: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
951: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
952: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
953: #modalRecibo
973: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
974: #modalPixArea
990: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
991: #modalIA
1073: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1074: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1075: #modalEditVeh
1094: #modalSenha
1116: #modalMeusRecibos
1134: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1135: #modalEmail
1155: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1156: #modalReport
1171: #modalFinance
1248: <!-- FILTROS -->
1296: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1316: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1317: #modalExpenses
1352: <!-- MODAL NOVO PIX -->
1353: #modalNewPix
1405: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1463: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1464: #modalCorrigirRecibo
1478: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1479: #modalDocViewer
1487: #modalDocBody
1488: <!-- Conteúdo pré-visualizado -->
1494: #modalTerms
1508: <!-- NOTIFICAÇÕES TOAST -->
1525: lsGet()
1526: lsSet()
1527: lsDel()
1550: demoLoginRole()
1554: demoId()
1555: demoSave()
1556: demoSaved()
1558: *datas no horário de Brasília*
1559: demoLocal()
1560: demoParts()
1561: demoDay()
1562: demoNextDue()
1567: *dados fictícios (4 meses)*
1568: demoBuild()
1712: *documentos fictícios (imagem gerada na hora)*
1713: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1714: demoDocBlob()
1792: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1793: demoQuery()
1816: out()
1822: run()
1863: demoOnUpdate()
1873: demoOnInsert()
1941: demoClient()
2006: demoStart()
2014: demoStop()
2020: abrirDemo()
2027: trocarDemo()
2032: demoBanner()
2047: toEmail()
2051: showLogin()
2055: esc()
2059: friendlyError()
2069: devicePrefs()
2072: saveDevicePrefs()
2075: docRef()
2076: viewDocIdx()
2078: setBusy()
2116: **TEMAS**
2125: currentTheme()
2130: applyTheme()
2137: openThemes()
2147: pickTheme()
2153: toggleDarkMode()
2155: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2157: loadDesignCfg()
2164: applyDesign()
2183: markMasterNav()
2188: fillDesignCfg()
2192: saveDesign()
2206: showToast()
2215: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2216: senhaErro()
2217: abrirSenha()
2226: salvarIaCodigo()
2236: fecharSenha()
2237: salvarSenha()
2258: loginUserInput()
2263: loginErro()
2267: verSenha()
2272: handleLogin()
2321: logout()
2340: saveFirstLoginPreferences()
2362: loadAndRender()
2416: autoRefresh()
2455: markUpdated()
2460: reload()
2465: renderApp()
2513: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2516: masterBack()
2518: viewAsDriver()
2540: exitViewAs()
2559: viewOnly()
2560: renderViewAsBanner()
2570: showSection()
2576: toggleDriverStatus()
2585: isOnline()
2587: updateStatusToggleUI()
2600: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2609: checkApkUpdate()
2624: updateInstallApkButton()
2644: renderDriverPanel()
2813: switchDriverTab()
2828: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2831: parsePixKey()
2835: normalizePixKey()
2843: pixKeyLooksOk()
2851: togglePixKeyFields()
2857: updatePixKeyPlaceholder()
2863: copyPixKey()
2870: copyPixCode()
2882: receiptBadge()
2892: receiptMasterBox()
2917: receiptAction()
2924: confirmReceipt()
2931: rejectReceipt()
2940: recheckReceipt()
2949: uploadReceipt()
2972: switchMasterTab()
2989: maskPhone()
2998: waLink()
3003: allVeh()
3004: renderMasterPanel()
3117: handleAddVehicle()
3150: deleteVehicle()
3151: cancelDeleteVehicle()
3153: confirmDeleteVehicle()
3171: abrirEditarVeiculo()
3190: fecharEditarVeiculo()
3191: salvarEditarVeiculo()
3221: drvCauMostra()
3228: drvCauLer()
3235: handleAddDriver()
3313: updateDriverPaymentStatus()
3322: deleteDriver()
3323: cancelDeleteDriver()
3325: confirmDeleteDriver()
3342: prepareFile()
3364: uploadFile()
3375: fileUrl()
3386: downloadName()
3390: renderFilePreview()
3410: renderPdfToCanvas()
3437: viewDoc()
3458: **DINHEIRO**
3459: parseMoney()
3466: fmtMoney()
3467: fmtDate()
3468: todayISO()
3470: **CONFIGURAÇÕES (Gemini e Google Drive)**
3472: loadConfigStatus()
3477: paintConfig()
3482: openSettings()
3492: closeSettings()
3493: saveConfig()
3503: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3504: loadAsaasInfo()
3517: saveAsaas()
3525: testarAsaas()
3532: **PICPAY (Financeiro) — mesmas regras do Asaas; os segredos ficam em app_secrets**
3533: loadPicpayInfo()
3545: savePicpay()
3553: savePicpayCred()
3564: testarPicpay()
3571: copiarAsaas()
3575: testDrive()
3582: resyncDrive()
3590: **FICHA DO MOTORISTA**
3593: openDriverFile()
3622: closeDriverFile()
3624: saveDriverFile()
3672: aiFillDriver()
3711: **CONTROLE FINANCEIRO**
3712: finRange()
3729: dayBR()
3730: inRange()
3732: onFinPeriodChange()
3738: fillFinFilters()
3745: clearFinFilters()
3749: updateFinFilterCount()
3758: openFinance()
3763: switchFinTab()
3773: closeFinance()
3775: renderFinance()
3838: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3840: okEmail()
3842: openEmailCompose()
3863: closeEmailCompose()
3864: sendEmailCompose()
3879: emailRecibo()
3884: emailIA()
3892: **RELATÓRIO DO FINANCEIRO**
3894: finFiltersText()
3899: finPeriodText()
3906: buildReportHtml()
3928: openFinReport()
3938: closeFinReport()
3939: printFinReport()
3943: shareFinReport()
3953: emailFinReport()
3959: **DESPESAS DO VEÍCULO**
3961: openExpenses()
3973: closeExpenses()
3974: fillExpenseTypes()
3979: createExpenseType()
3994: aiReadExpense()
4026: renderExpenses()
4048: saveExpense()
4075: deleteExpense()
4096: photoCard()
4125: inspectionHtml()
4151: hydrateImages()
4157: openInspection()
4165: closeInspection()
4169: renderInspectionModal()
4176: uploadInspection()
4207: deleteInspectionPhoto()
4223: fmtDue()
4229: nextDueLocal()
4240: openNewPix()
4269: **CAUÇÃO DO MOTORISTA**
4270: cauOf()
4271: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4272: devOf()
4273: devCobrancas()
4275: devPrevisao()
4283: dfDevRender()
4310: dfDevIr()
4311: dfDevSalvar()
4316: dfDevAvisar()
4322: dfDevDesfazer()
4326: dfDevReceber()
4335: cauNext()
4342: dfCauFill()
4352: dfCauCalc()
4369: dfCauRead()
4382: **CAUÇÃO: quanto já foi pago**
4384: cauStatus()
4394: obsResumoHtml()
4395: cauResumoHtml()
4400: **MULTAS E OUTRAS DESPESAS**
4401: multasOf()
4403: multaPagaAuto()
4408: multasAbertas()
4409: multasPendentes()
4410: multasResumoHtml()
4418: cobOf()
4419: dfCobFill()
4425: dfCobRead()
4428: dfCobInfo()
4438: cobResumoHtml()
4442: ajustesOf()
4444: previsaoProxima()
4457: previsaoHtml()
4461: dfAjRender()
4467: addAjuste()
4473: delAjuste()
4476: abrirAjustes()
4477: renderProxCobrancas()
4483: savePixExtra()
4491: dfMultFill()
4499: fdPaga()
4500: dfMultRender()
4509: toggleMultas()
4516: addMulta()
4524: delMulta()
4529: multaPaga()
4535: renderDriverExtras()
4562: mondayAfter()
4570: renderDriverProfileExtras()
4618: semanaDoPix()
4624: **MEUS RECIBOS (área do motorista)**
4626: meusRecibosLista()
4630: openMeusRecibos()
4644: closeMeusRecibos()
4645: reciboPdfHtml()
4656: verMeuRecibo()
4663: voltarMeusRecibos()
4664: pdfMeuRecibo()
4668: shareMeuRecibo()
4675: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4676: editVehicleRent()
4688: nextParcel()
4694: fillNewPixValues()
4730: newPixParts()
4761: **PERÍODO E VENCIMENTO DA COBRANÇA**
4762: dataISO()
4763: dataDe()
4764: dataMais()
4765: dataBR()
4766: diasEntre()
4767: isoSP()
4768: pixPeriodo()
4775: pixDesc()
4776: pixDiasPeriodo()
4780: pixDatasNovo()
4789: pixDatasMudou()
4800: pixAluguelProporcional()
4808: pixPeriodoInfo()
4821: pixAddLinha()
4828: pixLinhas()
4830: descSoma()
4840: calcNewPix()
4849: **RECIBO DE PAGAMENTO**
4853: receiptValue()
4854: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4855: atrasoDados()
4862: cobrarAtraso()
4878: allocatePix()
4897: reciboData()
4920: fmtDateTimeBR()
4921: reciboTexto()
4972: openRecibo()
4991: closeRecibo()
4992: **CORRIGIR RECIBO**
4994: corrigirLinhaHtml()
5004: openCorrigirRecibo()
5027: closeCorrigirRecibo()
5028: corrigirLer()
5034: corrigirSoma()
5041: salvarCorrigirRecibo()
5058: copyRecibo()
5063: reciboCanvas()
5079: shareReciboImage()
5094: rotularTabelas()
5114: areaAberta()
5115: markAreas()
5118: closeAreas()
5122: toggleArea()
5132: dobraSalva()
5133: setDobra()
5138: toggleDobra()
5145: dobraTopo()
5152: renderMasterResumo()
5166: loadIA()
5187: updateIABadge()
5192: loadIASetting()
5198: paintIASwitch()
5204: toggleIA()
5211: loadRobo()
5217: paintRobo()
5245: pedirCodigoRobo()
5254: toggleRobo()
5266: iaTodosGerar()
5284: iaTodosCancelar()
5288: iaTodosConfirmar()
5302: loadIARules()
5307: iaAbrirPdf()
5313: renderIARules()
5317: saveIARules()
5322: addIARule()
5327: delIARule()
5331: openIA()
5344: closeIA()
5345: iaShow()
5346: iaPhone()
5351: renderIA()
5393: iaAprovar()
5402: iaPhone2()
5403: iaSend()
5414: iaMark()
5423: iaDelete()
5432: openPixArea()
5441: closePixArea()
5442: renderPixArea()
5478: openEditPix()
5507: deletePix()
5519: closeNewPix()
5521: saveNewPix()
5612: pushSupported()
5613: isIOS()
5614: isStandalone()
5615: b64ToBytes()
5621: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5626: notifStatus()
5634: stepsList()
5638: notifHelpHtml()
5672: renderNotifModal()
5684: checkDriverNotifications()
5715: activateFromModal()
5726: refreshNotifButton()
5745: subscribePush()
5760: enableNotifications()
5778: closeDocViewer()
5786: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5798: allFeaturesOn()
5799: feat()
5800: loadDriverFeatures()
5807: saveDriverFeatures()
5811: drawFeatureToggles()
5826: setAllFeatures()
5831: applyDriverFeatures()
5845: **PIX: conferência do código e QR code desenhado no aparelho**
5846: crc16()
5854: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5856: pixTxt()
5857: pixCampo()
5858: pixGerarCodigo()
5868: pixAutoLigado()
5869: pixAutoMudou()
5874: gerarPixAuto()
5890: pixRecebedorCarregar()
5901: pixRecebedorGuardar()
5908: pixValid()
5914: renderPixQr()
5924: previewNewPixQr()
5934: **FOTO DO MOTORISTA (recortada da CNH)**
5935: photoPath()
5936: fileToCanvas()
5955: cropPhoto()
5969: savePhoto()
5974: photoBoxFrom()
5980: fillAvatar()
5991: fillAvatars()
6004: storedFile()
6011: photoFromCnh()
6023: **FOTO DO PERFIL ACOMPANHA A CNH**
6026: cnhStamp()
6027: photoFiles()
6035: avatarPath()
6040: syncCnhPhotos()
6063: pickImage()
6066: changeDriverPhoto()
6082: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6084: uploadTmp()
6091: clearTmp()
6096: aiReadFiles()
6102: okDateISO()
6104: noAccents()
6106: makeUsername()
6115: titleCase()
6116: syncNewDriverAccess()
6122: setNewDriverPhoto()
6127: pickNewDriverPhoto()
6131: resetNewDriverForm()
6139: newDriverDocChosen()
6173: anoCrlv()
6174: aiReadCrlv()
6191: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6192: sendWelcomeEmail()
6198: showCredentials()
6209: demoAssistente()
6228: **PERGUNTAR À IA (ÁREA IA, só o master)**
6232: iaChatReset()
6233: iaNorm()
6234: iaAcha()
6240: iaVeicTxt()
6241: iaCamposVeic()
6242: iaDataOk()
6243: iaOpcoes()
6244: iaTodosMotoristas()
6248: iaFerramenta()
6337: renderIAChat()
6354: iaChatDica()
6355: iaChatEnviar()
6390: iaChatNota()
6391: iaCancelarCartao()
6392: iaConfirmarCartao()
6435: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6436: renderAppEarnings()
6500: saveAppEarning()
6525: workDayISO()
6526: renderDayOff()
6537: setDayOff()
6547: aiReadEarning()
6580: **DESPESAS DO APLICATIVO**
6582: appExpCustomTypes()
6583: fillAppExpTypes()
6590: onAppExpTypeChange()
6595: saveAppExpense()
6619: deleteAppExpense()
6626: deleteAppEarning()
6721: loadTermsAcceptances()
6733: termsOf()
6734: currentAcceptance()
6735: needsTermsAcceptance()
6738: fmtDateTime()
6741: termsPlainText()
6745: termsHash()
6753: openTermsGate()
6776: termsGateCheck()
6784: acceptTerms()
6804: acceptanceHtml()
6815: openTermsViewer()
6833: closeTerms()
6839: downloadTermsCopy()
6860: termsBadgeMaster()
6867: termsMasterDetail()
6908: renderTermsSetupBanner()
6921: copyTermsSql()
6931: cnhExpired()
6932: cnhWaiting()
6933: onlyDigits()
6934: normName()
6936: verifyCnh()
6948: renderCnhBanner()
6966: sendNewCnh()
7014: cnhBadgeMaster()
7022: applyPendingCnh()
7030: autoReadNewCnhs()
7048: cnhPendingHtml()
7062: recheckPendingCnh()
7072: rejectPendingCnh()
7082: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (769 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
94: criarRobo()
97: hora()
98: log()
108: pareado()
109: limparLocal()
111: motoraBruto()
122: motora()
128: avisarErroPareamento()
130: *conexão guardada no Supabase*
131: existeGuardada()
132: restaurar()
166: guardar()
194: agendarBackup()
200: *conexão com o WhatsApp*
201: agendarAbrir()
206: backoff()
211: falhaAoAbrir()
213: soltarSocket()
220: abrir()
251: *conversa que já existia (pedido do dono, 04/11/2026)*
255: aoHistorico()
263: conversaAntiga()
275: aoMudar()
304: esquecerConexao()
310: aoCair()
326: reabrirQr()
351: *conectar pelo número*
352: verificarPareamento()
393: *fila de envio*
395: mandar()
405: conteudoDe()
406: enviar()
423: enviarCopias()
445: marcarEnviada()
452: verReinicio()
463: sinalDeVida()
476: ciclo()
511: *mensagens recebidas (comprovante de motorista e resposta do dono)*
514: aoReceber()
521: telefoneDe()
530: avisarArquivoSemNumero()
537: comRepeticao()
545: responder()
550: tratarRecebida()
607: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
609: destino()
617: encaminhar()
622: ouvirDono()
634: entregarAtendimento()
659: pessoaRespondeu()
672: chamarDara()
695: cicloAtendimento()
700: receberArquivo()
719: *página do QR*
720: pagina()
734: *laços*
735: repetir()
742: iniciar()
753: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (302 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
79: cobrarMotorista()
92: *valores (mesma regra do Novo Pix)*
118: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
140: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
160: cobrarTodos()
179: *pagamento recebido*
180: quemPagou()
203: pagamentoRecebido()
243: ehMaster()
253: preparar()
254: limpa()
291: acao "preparar"
295: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (288 linhas)

15: serviceKey()
21: json()
22: brl()
26: secret()
31: hojeBR()
32: diaBR()
33: proximoDia()
40: previsao()
54: formaAuto()
56: avisoDono()
81: avisoMotorista()
102: emAberto()
114: avisoAtraso()
132: **4) PIX AUTOMÁTICO DO MOTORA**
134: crc16()
139: campo()
140: txtPix()
141: codigoPix()
148: chaveNormal()
155: proximaParcela()
163: pixAutomatico()
170: *valores (mesma regra do Novo Pix e do Asaas)*
195: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
216: pixAutoTodos()
240: enviar()
249: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-picpay/index.ts (267 linhas)

16: serviceKey()
23: json()
24: brl()
27: secret()
32: hostPicpay()
37: tokenPicpay()
51: picpay()
61: avisar()
70: hojeBR()
71: proximoDia()
78: proximaParcela()
87: telefone()
94: cobrarMotorista()
111: *valores (mesma regra do Novo Pix e do Asaas)*
137: *cobrança Pix: o QR vale até 23:59 do vencimento*
156: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
175: *pagamento recebido: sempre confere na API do PicPay antes de dar baixa*
176: conferirCobranca()
211: cobrarTodos()
225: ehMaster()
241: acao "cobrar"
245: acao "testar"

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (437 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
295: sendToDriver()
308: type "public_key"
317: type "sunday"
325: type "recibo_teste"
329: type "master_alert"
333: type "driver_alert"
345: type "test"
353: type "aprovar_msg"
364: type "todos_rascunho"
372: type "todos_enviar"
382: type "new_pix"
394: type "boas_vindas"
409: type "cobranca"

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-02-picpay.sql: MOTORA — 02/11/2026: pagamento automático pelo PicPay (conta PJ), como opção ao Asaas na ficha do motorista.
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
