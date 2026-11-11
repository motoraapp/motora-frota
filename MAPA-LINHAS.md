# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 11/11/2026, 00:26:23. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7120 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
157: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
162: <!-- Header Principal -->
176: <!-- Controles do Header -->
178: <!-- Botão Status Online/Offline (Motorista) -->
186: <!-- Ativar Notificações -->
191: <!-- Temas -->
196: <!-- Logout Button -->
205: <!-- Conteúdo Principal -->
208: <!-- TELA DE LOGIN -->
209: #secLogin
242: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
243: #secDemoEscolha
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
276: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
286: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
291: <!-- Aviso: nova versão do app Android -->
294: <!-- Aviso vermelho: notificações desligadas -->
297: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
301: <!-- Aviso de Pix / pagamento pendente -->
304: <!-- Navegação de Abas -->
322: <!-- Conteúdo das Abas Motorista -->
325: <!-- Aba CRLV-e -->
326: #tabDrvCrlv
331: <!-- Renderizado dinamicamente -->
335: <!-- Aba Contrato -->
336: #tabDrvContract
346: <!-- Renderizado dinamicamente -->
350: <!-- Aba Vistoria -->
351: #tabDrvInspection
358: <!-- Aba Pagamento -->
359: #tabDrvPayment
372: <!-- Caução e multas do motorista -->
374: <!-- Valor e descrição da cobrança -->
384: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
422: <!-- Seção Upload de Comprovante -->
439: <!-- Lista de comprovantes -->
449: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
450: #secMasterPanel
484: <!-- Aviso: falta criar a tabela dos termos no banco -->
487: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
489: <!-- Lista de Veículos -->
505: <!-- Renderizado via JS -->
512: <!-- Form de Adicionar Veículo -->
546: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
552: <!-- Lista de Motoristas -->
569: <!-- Renderizado via JS -->
576: <!-- Form de Adicionar Motorista -->
671: <!-- Barra de baixo do dono (só no design novo) -->
681: <!-- MODAL PRIMEIRO LOGIN -->
682: #modalFirstLogin
716: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
717: #modalNotif
730: <!-- MODAL VISTORIA (MASTER) -->
731: #modalInspection
744: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
745: #modalSettings
804: <!-- MODAL TEMAS -->
805: #modalThemes
816: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
817: #modalCreds
832: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
833: #modalDriverFile
897: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
912: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
954: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
955: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
956: #modalRecibo
975: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
976: #modalPixArea
992: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
993: #modalIA
1075: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1076: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1077: #modalEditVeh
1096: #modalSenha
1118: #modalMeusRecibos
1136: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1137: #modalEmail
1157: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1158: #modalReport
1173: #modalFinance
1226: <!-- FILTROS -->
1275: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1295: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1296: #modalExpenses
1331: <!-- MODAL NOVO PIX -->
1332: #modalNewPix
1384: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1442: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1443: #modalCorrigirRecibo
1457: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1458: #modalDocViewer
1466: #modalDocBody
1467: <!-- Conteúdo pré-visualizado -->
1473: #modalTerms
1487: <!-- NOTIFICAÇÕES TOAST -->
1504: lsGet()
1505: lsSet()
1506: lsDel()
1529: demoLoginRole()
1533: demoId()
1534: demoSave()
1535: demoSaved()
1537: *datas no horário de Brasília*
1538: demoLocal()
1539: demoParts()
1540: demoDay()
1541: demoNextDue()
1546: *dados fictícios (4 meses)*
1547: demoBuild()
1690: *documentos fictícios (imagem gerada na hora)*
1691: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1692: demoDocBlob()
1770: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1771: demoQuery()
1794: out()
1800: run()
1841: demoOnUpdate()
1851: demoOnInsert()
1918: demoClient()
1983: demoStart()
1991: demoStop()
1997: abrirDemo()
2004: trocarDemo()
2009: demoBanner()
2024: toEmail()
2028: showLogin()
2032: esc()
2036: friendlyError()
2046: devicePrefs()
2049: saveDevicePrefs()
2052: docRef()
2053: viewDocIdx()
2055: setBusy()
2093: **TEMAS**
2102: currentTheme()
2107: applyTheme()
2108: openThemes()
2118: pickTheme()
2124: toggleDarkMode()
2126: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2128: loadDesignCfg()
2135: applyDesign()
2152: markMasterNav()
2157: fillDesignCfg()
2162: saveDesign()
2176: showToast()
2185: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2186: senhaErro()
2187: abrirSenha()
2196: salvarIaCodigo()
2206: fecharSenha()
2207: salvarSenha()
2228: loginUserInput()
2233: loginErro()
2237: verSenha()
2242: handleLogin()
2291: logout()
2310: saveFirstLoginPreferences()
2332: loadAndRender()
2386: autoRefresh()
2425: markUpdated()
2430: reload()
2435: renderApp()
2483: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2486: masterBack()
2488: viewAsDriver()
2510: exitViewAs()
2529: viewOnly()
2530: renderViewAsBanner()
2540: showSection()
2546: toggleDriverStatus()
2555: isOnline()
2557: updateStatusToggleUI()
2570: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2579: checkApkUpdate()
2594: updateInstallApkButton()
2614: renderDriverPanel()
2783: switchDriverTab()
2798: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2801: parsePixKey()
2805: normalizePixKey()
2813: pixKeyLooksOk()
2821: togglePixKeyFields()
2827: updatePixKeyPlaceholder()
2833: copyPixKey()
2840: copyPixCode()
2852: receiptBadge()
2862: receiptMasterBox()
2887: receiptAction()
2894: confirmReceipt()
2901: rejectReceipt()
2910: recheckReceipt()
2919: uploadReceipt()
2942: switchMasterTab()
2959: maskPhone()
2968: waLink()
2973: allVeh()
2974: renderMasterPanel()
3087: handleAddVehicle()
3120: deleteVehicle()
3121: cancelDeleteVehicle()
3123: confirmDeleteVehicle()
3141: abrirEditarVeiculo()
3160: fecharEditarVeiculo()
3161: salvarEditarVeiculo()
3191: drvCauMostra()
3198: drvCauLer()
3205: handleAddDriver()
3282: updateDriverPaymentStatus()
3291: deleteDriver()
3292: cancelDeleteDriver()
3294: confirmDeleteDriver()
3311: prepareFile()
3333: uploadFile()
3344: fileUrl()
3355: downloadName()
3359: renderFilePreview()
3379: renderPdfToCanvas()
3406: viewDoc()
3427: **DINHEIRO**
3428: parseMoney()
3435: fmtMoney()
3436: fmtDate()
3437: todayISO()
3439: **CONFIGURAÇÕES (Gemini e Google Drive)**
3441: loadConfigStatus()
3446: paintConfig()
3451: openSettings()
3461: closeSettings()
3462: saveConfig()
3472: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3473: loadAsaasInfo()
3486: saveAsaas()
3494: testarAsaas()
3501: copiarAsaas()
3505: testDrive()
3512: resyncDrive()
3520: **FICHA DO MOTORISTA**
3523: openDriverFile()
3552: closeDriverFile()
3554: saveDriverFile()
3602: aiFillDriver()
3641: **CONTROLE FINANCEIRO**
3642: finRange()
3659: dayBR()
3660: inRange()
3662: onFinPeriodChange()
3668: fillFinFilters()
3675: clearFinFilters()
3679: updateFinFilterCount()
3688: openFinance()
3693: switchFinTab()
3703: closeFinance()
3705: renderFinance()
3770: renderFinGrafico()
3790: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3792: okEmail()
3794: openEmailCompose()
3815: closeEmailCompose()
3816: sendEmailCompose()
3831: emailRecibo()
3836: emailIA()
3844: **RELATÓRIO DO FINANCEIRO**
3846: finFiltersText()
3851: finPeriodText()
3858: buildReportHtml()
3880: openFinReport()
3890: closeFinReport()
3891: printFinReport()
3895: shareFinReport()
3905: emailFinReport()
3911: **DESPESAS DO VEÍCULO**
3913: openExpenses()
3925: closeExpenses()
3926: fillExpenseTypes()
3931: createExpenseType()
3946: aiReadExpense()
3978: renderExpenses()
4000: saveExpense()
4027: deleteExpense()
4048: photoCard()
4077: inspectionHtml()
4103: hydrateImages()
4109: openInspection()
4117: closeInspection()
4121: renderInspectionModal()
4128: uploadInspection()
4159: deleteInspectionPhoto()
4175: fmtDue()
4181: nextDueLocal()
4192: openNewPix()
4221: **CAUÇÃO DO MOTORISTA**
4222: cauOf()
4223: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4224: devOf()
4225: devCobrancas()
4227: devPrevisao()
4235: dfDevRender()
4262: dfDevIr()
4263: dfDevSalvar()
4268: dfDevAvisar()
4274: dfDevDesfazer()
4278: dfDevReceber()
4287: cauNext()
4294: dfCauFill()
4304: dfCauCalc()
4321: dfCauRead()
4334: **CAUÇÃO: quanto já foi pago**
4336: cauStatus()
4346: obsResumoHtml()
4347: cauResumoHtml()
4352: **MULTAS E OUTRAS DESPESAS**
4353: multasOf()
4355: multaPagaAuto()
4360: multasAbertas()
4361: multasPendentes()
4362: multasResumoHtml()
4370: cobOf()
4371: dfCobFill()
4377: dfCobRead()
4380: dfCobInfo()
4390: cobResumoHtml()
4394: ajustesOf()
4396: previsaoProxima()
4409: previsaoHtml()
4413: dfAjRender()
4419: addAjuste()
4425: delAjuste()
4428: abrirAjustes()
4429: renderProxCobrancas()
4435: savePixExtra()
4443: dfMultFill()
4451: fdPaga()
4452: dfMultRender()
4461: toggleMultas()
4468: addMulta()
4476: delMulta()
4481: multaPaga()
4487: renderDriverExtras()
4514: mondayAfter()
4522: renderDriverProfileExtras()
4570: semanaDoPix()
4576: **MEUS RECIBOS (área do motorista)**
4578: meusRecibosLista()
4582: openMeusRecibos()
4596: closeMeusRecibos()
4597: reciboPdfHtml()
4608: verMeuRecibo()
4615: voltarMeusRecibos()
4616: pdfMeuRecibo()
4620: shareMeuRecibo()
4627: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4628: editVehicleRent()
4640: nextParcel()
4646: fillNewPixValues()
4682: newPixParts()
4713: **PERÍODO E VENCIMENTO DA COBRANÇA**
4714: dataISO()
4715: dataDe()
4716: dataMais()
4717: dataBR()
4718: diasEntre()
4719: isoSP()
4720: pixPeriodo()
4727: pixDesc()
4728: pixDiasPeriodo()
4732: pixDatasNovo()
4741: pixDatasMudou()
4752: pixAluguelProporcional()
4760: pixPeriodoInfo()
4773: pixAddLinha()
4780: pixLinhas()
4782: descSoma()
4792: calcNewPix()
4801: **RECIBO DE PAGAMENTO**
4805: receiptValue()
4806: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4807: atrasoDados()
4814: cobrarAtraso()
4830: allocatePix()
4849: reciboData()
4872: fmtDateTimeBR()
4873: reciboTexto()
4924: openRecibo()
4941: closeRecibo()
4942: **CORRIGIR RECIBO**
4944: corrigirLinhaHtml()
4954: openCorrigirRecibo()
4977: closeCorrigirRecibo()
4978: corrigirLer()
4984: corrigirSoma()
4991: salvarCorrigirRecibo()
5008: copyRecibo()
5013: reciboCanvas()
5030: reciboPdfBlob()
5048: shareReciboPdf()
5062: rotularTabelas()
5082: areaAberta()
5083: markAreas()
5086: closeAreas()
5090: toggleArea()
5100: dobraSalva()
5101: setDobra()
5106: toggleDobra()
5113: dobraTopo()
5120: renderMasterResumo()
5134: renderMasterTopo()
5156: loadIA()
5178: updateIABadge()
5183: loadIASetting()
5189: paintIASwitch()
5195: toggleIA()
5202: loadRobo()
5211: iaPrepararQr()
5216: paintRobo()
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
5434: iaMark()
5443: iaDelete()
5452: openPixArea()
5461: closePixArea()
5462: renderPixArea()
5498: openEditPix()
5527: deletePix()
5539: closeNewPix()
5541: saveNewPix()
5632: pushSupported()
5633: isIOS()
5634: isStandalone()
5635: b64ToBytes()
5641: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5646: notifStatus()
5654: stepsList()
5658: notifHelpHtml()
5692: renderNotifModal()
5704: checkDriverNotifications()
5735: activateFromModal()
5746: refreshNotifButton()
5765: subscribePush()
5780: enableNotifications()
5798: closeDocViewer()
5806: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5818: allFeaturesOn()
5819: feat()
5820: loadDriverFeatures()
5827: saveDriverFeatures()
5831: drawFeatureToggles()
5846: setAllFeatures()
5851: applyDriverFeatures()
5865: **PIX: conferência do código e QR code desenhado no aparelho**
5866: crc16()
5874: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5876: pixTxt()
5877: pixCampo()
5878: pixGerarCodigo()
5888: pixAutoLigado()
5889: pixAutoMudou()
5894: gerarPixAuto()
5910: pixRecebedorCarregar()
5921: pixRecebedorGuardar()
5928: pixValid()
5934: renderPixQr()
5944: previewNewPixQr()
5954: **FOTO DO MOTORISTA (recortada da CNH)**
5955: photoPath()
5956: fileToCanvas()
5975: cropPhoto()
5989: savePhoto()
5994: photoBoxFrom()
6000: fillAvatar()
6011: fillAvatars()
6024: storedFile()
6031: photoFromCnh()
6043: **FOTO DO PERFIL ACOMPANHA A CNH**
6046: cnhStamp()
6047: photoFiles()
6055: avatarPath()
6060: syncCnhPhotos()
6083: pickImage()
6086: changeDriverPhoto()
6102: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6104: uploadTmp()
6111: clearTmp()
6116: aiReadFiles()
6122: okDateISO()
6124: noAccents()
6126: makeUsername()
6135: titleCase()
6136: syncNewDriverAccess()
6142: setNewDriverPhoto()
6147: pickNewDriverPhoto()
6151: resetNewDriverForm()
6159: newDriverDocChosen()
6193: anoCrlv()
6194: aiReadCrlv()
6211: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6212: sendWelcomeEmail()
6218: showCredentials()
6229: demoAssistente()
6248: **PERGUNTAR À IA (ÁREA IA, só o master)**
6252: iaChatReset()
6253: iaNorm()
6254: iaAcha()
6260: iaVeicTxt()
6261: iaCamposVeic()
6262: iaDataOk()
6263: iaOpcoes()
6264: iaTodosMotoristas()
6268: iaFerramenta()
6357: renderIAChat()
6374: iaChatDica()
6375: iaChatEnviar()
6410: iaChatNota()
6411: iaCancelarCartao()
6412: iaConfirmarCartao()
6455: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6456: renderAppEarnings()
6520: saveAppEarning()
6545: workDayISO()
6546: renderDayOff()
6557: setDayOff()
6567: aiReadEarning()
6600: **DESPESAS DO APLICATIVO**
6602: appExpCustomTypes()
6603: fillAppExpTypes()
6610: onAppExpTypeChange()
6615: saveAppExpense()
6639: deleteAppExpense()
6646: deleteAppEarning()
6741: loadTermsAcceptances()
6753: termsOf()
6754: currentAcceptance()
6755: needsTermsAcceptance()
6758: fmtDateTime()
6761: termsPlainText()
6765: termsHash()
6773: openTermsGate()
6796: termsGateCheck()
6804: acceptTerms()
6824: acceptanceHtml()
6835: openTermsViewer()
6853: closeTerms()
6859: downloadTermsCopy()
6880: termsBadgeMaster()
6887: termsMasterDetail()
6928: renderTermsSetupBanner()
6941: copyTermsSql()
6951: cnhExpired()
6952: cnhWaiting()
6953: onlyDigits()
6954: normName()
6956: verifyCnh()
6968: renderCnhBanner()
6986: sendNewCnh()
7034: cnhBadgeMaster()
7042: applyPendingCnh()
7050: autoReadNewCnhs()
7068: cnhPendingHtml()
7082: recheckPendingCnh()
7092: rejectPendingCnh()
7102: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

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
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

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

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

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
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
