# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 10/11/2026, 19:24:19. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7101 linhas)

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
2625: updateInstallApkButton()
2645: renderDriverPanel()
2814: switchDriverTab()
2829: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2832: parsePixKey()
2836: normalizePixKey()
2844: pixKeyLooksOk()
2852: togglePixKeyFields()
2858: updatePixKeyPlaceholder()
2864: copyPixKey()
2871: copyPixCode()
2883: receiptBadge()
2893: receiptMasterBox()
2918: receiptAction()
2925: confirmReceipt()
2932: rejectReceipt()
2941: recheckReceipt()
2950: uploadReceipt()
2973: switchMasterTab()
2990: maskPhone()
2999: waLink()
3004: allVeh()
3005: renderMasterPanel()
3118: handleAddVehicle()
3151: deleteVehicle()
3152: cancelDeleteVehicle()
3154: confirmDeleteVehicle()
3172: abrirEditarVeiculo()
3191: fecharEditarVeiculo()
3192: salvarEditarVeiculo()
3222: drvCauMostra()
3229: drvCauLer()
3236: handleAddDriver()
3314: updateDriverPaymentStatus()
3323: deleteDriver()
3324: cancelDeleteDriver()
3326: confirmDeleteDriver()
3343: prepareFile()
3365: uploadFile()
3376: fileUrl()
3387: downloadName()
3391: renderFilePreview()
3411: renderPdfToCanvas()
3438: viewDoc()
3459: **DINHEIRO**
3460: parseMoney()
3467: fmtMoney()
3468: fmtDate()
3469: todayISO()
3471: **CONFIGURAÇÕES (Gemini e Google Drive)**
3473: loadConfigStatus()
3478: paintConfig()
3483: openSettings()
3493: closeSettings()
3494: saveConfig()
3504: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3505: loadAsaasInfo()
3518: saveAsaas()
3526: testarAsaas()
3533: **PICPAY (Financeiro) — mesmas regras do Asaas; os segredos ficam em app_secrets**
3534: loadPicpayInfo()
3546: savePicpay()
3554: savePicpayCred()
3565: testarPicpay()
3572: copiarAsaas()
3576: testDrive()
3583: resyncDrive()
3591: **FICHA DO MOTORISTA**
3594: openDriverFile()
3623: closeDriverFile()
3625: saveDriverFile()
3673: aiFillDriver()
3712: **CONTROLE FINANCEIRO**
3713: finRange()
3730: dayBR()
3731: inRange()
3733: onFinPeriodChange()
3739: fillFinFilters()
3746: clearFinFilters()
3750: updateFinFilterCount()
3759: openFinance()
3764: switchFinTab()
3774: closeFinance()
3776: renderFinance()
3839: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3841: okEmail()
3843: openEmailCompose()
3864: closeEmailCompose()
3865: sendEmailCompose()
3880: emailRecibo()
3885: emailIA()
3893: **RELATÓRIO DO FINANCEIRO**
3895: finFiltersText()
3900: finPeriodText()
3907: buildReportHtml()
3929: openFinReport()
3939: closeFinReport()
3940: printFinReport()
3944: shareFinReport()
3954: emailFinReport()
3960: **DESPESAS DO VEÍCULO**
3962: openExpenses()
3974: closeExpenses()
3975: fillExpenseTypes()
3980: createExpenseType()
3995: aiReadExpense()
4027: renderExpenses()
4049: saveExpense()
4076: deleteExpense()
4097: photoCard()
4126: inspectionHtml()
4152: hydrateImages()
4158: openInspection()
4166: closeInspection()
4170: renderInspectionModal()
4177: uploadInspection()
4208: deleteInspectionPhoto()
4224: fmtDue()
4230: nextDueLocal()
4241: openNewPix()
4270: **CAUÇÃO DO MOTORISTA**
4271: cauOf()
4272: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4273: devOf()
4274: devCobrancas()
4276: devPrevisao()
4284: dfDevRender()
4311: dfDevIr()
4312: dfDevSalvar()
4317: dfDevAvisar()
4323: dfDevDesfazer()
4327: dfDevReceber()
4336: cauNext()
4343: dfCauFill()
4353: dfCauCalc()
4370: dfCauRead()
4383: **CAUÇÃO: quanto já foi pago**
4385: cauStatus()
4395: obsResumoHtml()
4396: cauResumoHtml()
4401: **MULTAS E OUTRAS DESPESAS**
4402: multasOf()
4404: multaPagaAuto()
4409: multasAbertas()
4410: multasPendentes()
4411: multasResumoHtml()
4419: cobOf()
4420: dfCobFill()
4426: dfCobRead()
4429: dfCobInfo()
4439: cobResumoHtml()
4443: ajustesOf()
4445: previsaoProxima()
4458: previsaoHtml()
4462: dfAjRender()
4468: addAjuste()
4474: delAjuste()
4477: abrirAjustes()
4478: renderProxCobrancas()
4484: savePixExtra()
4492: dfMultFill()
4500: fdPaga()
4501: dfMultRender()
4510: toggleMultas()
4517: addMulta()
4525: delMulta()
4530: multaPaga()
4536: renderDriverExtras()
4563: mondayAfter()
4571: renderDriverProfileExtras()
4619: semanaDoPix()
4625: **MEUS RECIBOS (área do motorista)**
4627: meusRecibosLista()
4631: openMeusRecibos()
4645: closeMeusRecibos()
4646: reciboPdfHtml()
4657: verMeuRecibo()
4664: voltarMeusRecibos()
4665: pdfMeuRecibo()
4669: shareMeuRecibo()
4676: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4677: editVehicleRent()
4689: nextParcel()
4695: fillNewPixValues()
4731: newPixParts()
4762: **PERÍODO E VENCIMENTO DA COBRANÇA**
4763: dataISO()
4764: dataDe()
4765: dataMais()
4766: dataBR()
4767: diasEntre()
4768: isoSP()
4769: pixPeriodo()
4776: pixDesc()
4777: pixDiasPeriodo()
4781: pixDatasNovo()
4790: pixDatasMudou()
4801: pixAluguelProporcional()
4809: pixPeriodoInfo()
4822: pixAddLinha()
4829: pixLinhas()
4831: descSoma()
4841: calcNewPix()
4850: **RECIBO DE PAGAMENTO**
4854: receiptValue()
4855: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4856: atrasoDados()
4863: cobrarAtraso()
4879: allocatePix()
4898: reciboData()
4921: fmtDateTimeBR()
4922: reciboTexto()
4973: openRecibo()
4992: closeRecibo()
4993: **CORRIGIR RECIBO**
4995: corrigirLinhaHtml()
5005: openCorrigirRecibo()
5028: closeCorrigirRecibo()
5029: corrigirLer()
5035: corrigirSoma()
5042: salvarCorrigirRecibo()
5059: copyRecibo()
5064: reciboCanvas()
5080: shareReciboImage()
5095: rotularTabelas()
5115: areaAberta()
5116: markAreas()
5119: closeAreas()
5123: toggleArea()
5133: dobraSalva()
5134: setDobra()
5139: toggleDobra()
5146: dobraTopo()
5153: renderMasterResumo()
5167: loadIA()
5188: updateIABadge()
5193: loadIASetting()
5199: paintIASwitch()
5205: toggleIA()
5212: loadRobo()
5218: paintRobo()
5246: pedirCodigoRobo()
5255: toggleRobo()
5267: iaTodosGerar()
5285: iaTodosCancelar()
5289: iaTodosConfirmar()
5303: loadIARules()
5308: iaAbrirPdf()
5314: renderIARules()
5318: saveIARules()
5323: addIARule()
5328: delIARule()
5332: openIA()
5345: closeIA()
5346: iaShow()
5347: iaPhone()
5352: renderIA()
5394: iaAprovar()
5403: iaPhone2()
5404: iaSend()
5415: iaMark()
5424: iaDelete()
5433: openPixArea()
5442: closePixArea()
5443: renderPixArea()
5479: openEditPix()
5508: deletePix()
5520: closeNewPix()
5522: saveNewPix()
5613: pushSupported()
5614: isIOS()
5615: isStandalone()
5616: b64ToBytes()
5622: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5627: notifStatus()
5635: stepsList()
5639: notifHelpHtml()
5673: renderNotifModal()
5685: checkDriverNotifications()
5716: activateFromModal()
5727: refreshNotifButton()
5746: subscribePush()
5761: enableNotifications()
5779: closeDocViewer()
5787: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5799: allFeaturesOn()
5800: feat()
5801: loadDriverFeatures()
5808: saveDriverFeatures()
5812: drawFeatureToggles()
5827: setAllFeatures()
5832: applyDriverFeatures()
5846: **PIX: conferência do código e QR code desenhado no aparelho**
5847: crc16()
5855: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5857: pixTxt()
5858: pixCampo()
5859: pixGerarCodigo()
5869: pixAutoLigado()
5870: pixAutoMudou()
5875: gerarPixAuto()
5891: pixRecebedorCarregar()
5902: pixRecebedorGuardar()
5909: pixValid()
5915: renderPixQr()
5925: previewNewPixQr()
5935: **FOTO DO MOTORISTA (recortada da CNH)**
5936: photoPath()
5937: fileToCanvas()
5956: cropPhoto()
5970: savePhoto()
5975: photoBoxFrom()
5981: fillAvatar()
5992: fillAvatars()
6005: storedFile()
6012: photoFromCnh()
6024: **FOTO DO PERFIL ACOMPANHA A CNH**
6027: cnhStamp()
6028: photoFiles()
6036: avatarPath()
6041: syncCnhPhotos()
6064: pickImage()
6067: changeDriverPhoto()
6083: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6085: uploadTmp()
6092: clearTmp()
6097: aiReadFiles()
6103: okDateISO()
6105: noAccents()
6107: makeUsername()
6116: titleCase()
6117: syncNewDriverAccess()
6123: setNewDriverPhoto()
6128: pickNewDriverPhoto()
6132: resetNewDriverForm()
6140: newDriverDocChosen()
6174: anoCrlv()
6175: aiReadCrlv()
6192: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6193: sendWelcomeEmail()
6199: showCredentials()
6210: demoAssistente()
6229: **PERGUNTAR À IA (ÁREA IA, só o master)**
6233: iaChatReset()
6234: iaNorm()
6235: iaAcha()
6241: iaVeicTxt()
6242: iaCamposVeic()
6243: iaDataOk()
6244: iaOpcoes()
6245: iaTodosMotoristas()
6249: iaFerramenta()
6338: renderIAChat()
6355: iaChatDica()
6356: iaChatEnviar()
6391: iaChatNota()
6392: iaCancelarCartao()
6393: iaConfirmarCartao()
6436: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6437: renderAppEarnings()
6501: saveAppEarning()
6526: workDayISO()
6527: renderDayOff()
6538: setDayOff()
6548: aiReadEarning()
6581: **DESPESAS DO APLICATIVO**
6583: appExpCustomTypes()
6584: fillAppExpTypes()
6591: onAppExpTypeChange()
6596: saveAppExpense()
6620: deleteAppExpense()
6627: deleteAppEarning()
6722: loadTermsAcceptances()
6734: termsOf()
6735: currentAcceptance()
6736: needsTermsAcceptance()
6739: fmtDateTime()
6742: termsPlainText()
6746: termsHash()
6754: openTermsGate()
6777: termsGateCheck()
6785: acceptTerms()
6805: acceptanceHtml()
6816: openTermsViewer()
6834: closeTerms()
6840: downloadTermsCopy()
6861: termsBadgeMaster()
6868: termsMasterDetail()
6909: renderTermsSetupBanner()
6922: copyTermsSql()
6932: cnhExpired()
6933: cnhWaiting()
6934: onlyDigits()
6935: normName()
6937: verifyCnh()
6949: renderCnhBanner()
6967: sendNewCnh()
7015: cnhBadgeMaster()
7023: applyPendingCnh()
7031: autoReadNewCnhs()
7049: cnhPendingHtml()
7063: recheckPendingCnh()
7073: rejectPendingCnh()
7083: showContractDoc()

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

## supabase/functions/motora-asaas/index.ts (301 linhas)

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
290: acao "preparar"
294: acao "cobrar"

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
