# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 19:57:46. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8678 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
824: <!-- MODAL TEMAS -->
825: #modalThemes
836: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
837: #modalCreds
852: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
867: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
868: #modalDriverFile
908: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
937: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
952: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
994: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
995: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
996: #modalRecibo
1015: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1016: #modalPixArea
1032: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1033: #modalIA
1115: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1116: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1117: #modalEditVeh
1136: #modalSenha
1158: #modalMeusRecibos
1176: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1177: #modalEmail
1197: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1198: #modalReport
1213: #modalFinCardDetail
1226: #modalFinance
1259: <!-- FILTROS -->
1309: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1329: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1330: #modalExpenses
1365: <!-- MODAL NOVO PIX -->
1366: #modalNewPix
1418: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1476: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1477: #modalCorrigirRecibo
1491: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1492: #modalDocViewer
1500: #modalDocBody
1501: <!-- Conteúdo pré-visualizado -->
1507: #modalTerms
1521: <!-- NOTIFICAÇÕES TOAST -->
1538: lsGet()
1539: lsSet()
1540: lsDel()
1563: demoLoginRole()
1567: demoId()
1568: demoSave()
1569: demoSaved()
1571: *datas no horário de Brasília*
1572: demoLocal()
1573: demoParts()
1574: demoDay()
1575: demoNextDue()
1580: *dados fictícios (4 meses)*
1581: demoBuild()
1724: *documentos fictícios (imagem gerada na hora)*
1725: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1726: demoDocBlob()
1804: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1805: demoQuery()
1828: out()
1834: run()
1875: demoOnUpdate()
1885: demoOnInsert()
1986: demoClient()
2051: demoStart()
2059: demoStop()
2065: abrirDemo()
2072: trocarDemo()
2077: demoBanner()
2092: toEmail()
2096: showLogin()
2100: esc()
2105: dataHoraBR()
2113: uiDialogo()
2161: uiConfirm()
2170: uiPrompt()
2176: friendlyError()
2186: devicePrefs()
2189: saveDevicePrefs()
2192: docRef()
2193: viewDocIdx()
2195: setBusy()
2233: **TEMAS**
2242: currentTheme()
2247: applyTheme()
2248: openThemes()
2258: pickTheme()
2264: toggleDarkMode()
2266: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2268: loadDesignCfg()
2275: applyDesign()
2292: markMasterNav()
2297: fillDesignCfg()
2302: saveDesign()
2316: showToast()
2325: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2326: senhaErro()
2327: abrirSenha()
2336: salvarIaCodigo()
2346: fecharSenha()
2347: salvarSenha()
2368: loginUserInput()
2373: loginErro()
2377: verSenha()
2382: handleLogin()
2431: logout()
2450: saveFirstLoginPreferences()
2473: carregarDados()
2498: aplicarDados()
2524: loadAndRender()
2551: autoRefresh()
2590: markUpdated()
2595: reload()
2600: renderApp()
2648: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2651: masterBack()
2653: viewAsDriver()
2675: exitViewAs()
2694: viewOnly()
2695: renderViewAsBanner()
2705: showSection()
2710: withBtn()
2718: toggleDriverStatus()
2727: isOnline()
2729: updateStatusToggleUI()
2742: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2751: checkApkUpdate()
2766: updateInstallApkButton()
2786: renderDriverPanel()
3011: switchDriverTab()
3026: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3029: parsePixKey()
3033: normalizePixKey()
3041: pixKeyLooksOk()
3049: togglePixKeyFields()
3055: updatePixKeyPlaceholder()
3061: copyPixKey()
3068: copyPixCode()
3080: receiptBadge()
3090: receiptMasterBox()
3117: receiptAction()
3124: confirmReceipt()
3137: rejectReceipt()
3149: recheckReceipt()
3158: uploadReceipt()
3181: switchMasterTab()
3198: maskPhone()
3207: waLink()
3212: allVeh()
3213: allDrv()
3214: chargeVehicleId()
3226: enviarPedidoParcialAsaas()
3242: pedirPixParcial()
3260: restaurarPixTotal()
3266: responderPixParcial()
3290: contrato30Info()
3320: encerrarContrato()
3337: encerrarContratoPrompt()
3350: reativarContrato()
3374: marcarCaucaoPagoArquivar()
3395: desarquivarFicha()
3413: deliveryInspectionHtml()
3443: uploadDeliveryPhotos()
3470: delDeliveryPhoto()
3488: addCauDesconto()
3513: puxarMultaCaucao()
3534: delCauDesconto()
3556: dfCauDescontosHtml()
3589: dfContratoRender()
3633: encerrarContratoConfirmFicha()
3640: renderMasterPanel()
3801: renderArchivedDrivers()
3846: handleAddVehicle()
3879: deleteVehicle()
3880: cancelDeleteVehicle()
3882: confirmDeleteVehicle()
3906: abrirEditarVeiculo()
3925: fecharEditarVeiculo()
3926: salvarEditarVeiculo()
3956: drvCauMostra()
3963: drvCauLer()
3971: handleAddDriver()
4049: marcarSituacao()
4059: updateDriverPaymentStatus()
4068: deleteDriver()
4069: cancelDeleteDriver()
4071: confirmDeleteDriver()
4094: prepareFile()
4116: uploadFile()
4127: fileUrl()
4138: downloadName()
4142: renderFilePreview()
4162: renderPdfToCanvas()
4189: viewDoc()
4210: **DINHEIRO**
4211: parseMoney()
4218: fmtMoney()
4219: fmtDate()
4220: todayISO()
4222: **CONFIGURAÇÕES (Gemini e Google Drive)**
4224: loadConfigStatus()
4229: paintConfig()
4234: fillOwnerVehicleSelect()
4240: saveOwnerVehicle()
4262: openSettings()
4275: closeSettings()
4276: saveConfig()
4286: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
4287: renderAsaasDrivers()
4314: toggleDriverAsaas()
4346: loadAsaasInfo()
4360: saveAsaas()
4368: testarAsaas()
4375: copiarAsaas()
4379: testDrive()
4386: resyncDrive()
4394: **FICHA DO MOTORISTA**
4397: openDriverFile()
4427: closeDriverFile()
4429: saveDriverFile()
4485: aiFillDriver()
4524: **CONTROLE FINANCEIRO**
4525: finRange()
4542: dayBR()
4543: inRange()
4545: onFinPeriodChange()
4551: fillFinFilters()
4559: clearFinFilters()
4563: updateFinFilterCount()
4572: openFinance()
4578: switchFinTab()
4589: finCardBtn()
4597: closeFinCardDetail()
4598: closeFinance()
4600: collectRentFinData()
4651: renderFinance()
4709: openFinCardDetail()
4916: openFinExtrato()
5010: renderFinExtratoView()
5091: openFinExtratoReport()
5108: renderFinGrafico()
5128: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5130: okEmail()
5132: openEmailCompose()
5153: closeEmailCompose()
5154: sendEmailCompose()
5169: emailRecibo()
5174: emailIA()
5182: **RELATÓRIO DO FINANCEIRO**
5184: finFiltersText()
5189: finPeriodText()
5196: buildReportHtml()
5218: openFinReport()
5228: closeFinReport()
5229: printFinReport()
5233: shareFinReport()
5243: emailFinReport()
5249: **DESPESAS DO VEÍCULO**
5251: openExpenses()
5263: closeExpenses()
5264: fillExpenseTypes()
5269: createExpenseType()
5284: aiReadExpense()
5316: renderExpenses()
5338: saveExpense()
5365: deleteExpense()
5390: photoCard()
5419: inspectionHtml()
5445: hydrateImages()
5451: openInspection()
5459: closeInspection()
5463: renderInspectionModal()
5470: uploadInspection()
5501: deleteInspectionPhoto()
5521: fmtDue()
5527: nextDueLocal()
5538: openNewPix()
5568: **CAUÇÃO DO MOTORISTA**
5569: cauOf()
5570: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5571: devOf()
5572: devCobrancas()
5574: devPrevisao()
5582: dfDevRender()
5609: dfDevIr()
5610: dfDevSalvar()
5615: dfDevAvisar()
5621: dfDevDesfazer()
5625: dfDevReceber()
5634: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5638: cauPlano()
5646: cauParcela()
5653: cauParcelasTexto()
5657: cauNext()
5664: dfCauFill()
5674: dfCauCalc()
5702: dfCauRead()
5715: expTypeName()
5719: driverFinVehicleId()
5731: cauEntradaItem()
5745: cauPagoDespesaItem()
5760: **CAUÇÃO: quanto já foi pago**
5762: cauStatus()
5772: obsResumoHtml()
5773: cauResumoHtml()
5778: **MULTAS E OUTRAS DESPESAS**
5779: multasOf()
5781: multaPagaAuto()
5786: multasAbertas()
5787: multasPendentes()
5788: multasResumoHtml()
5796: cobOf()
5797: dfCobFill()
5803: dfCobRead()
5806: dfCobInfo()
5816: cobResumoHtml()
5820: ajustesOf()
5824: ajusteVale()
5825: isoDia()
5827: vencProxima()
5828: previsaoProxima()
5842: previsaoHtml()
5846: dfAjRender()
5852: addAjuste()
5861: delAjuste()
5866: abrirAjustes()
5867: renderProxCobrancas()
5873: savePixExtra()
5881: dfMultFill()
5889: fdPaga()
5890: dfMultRender()
5899: toggleMultas()
5906: addMulta()
5916: delMulta()
5924: multaPaga()
5933: renderDriverExtras()
5961: mondayAfter()
5969: renderDriverProfileExtras()
6035: semanaDoPix()
6041: **MEUS RECIBOS (área do motorista)**
6043: meusRecibosLista()
6047: reciboRowHtml()
6055: renderEncerradoRecibos()
6060: openMeuReciboDireto()
6061: openMeusRecibos()
6068: closeMeusRecibos()
6069: reciboPdfHtml()
6080: verMeuRecibo()
6087: voltarMeusRecibos()
6088: pdfMeuRecibo()
6092: shareMeuRecibo()
6101: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6102: editVehicleRent()
6119: nextParcel()
6125: fillNewPixValues()
6161: newPixParts()
6192: **PERÍODO E VENCIMENTO DA COBRANÇA**
6193: dataISO()
6194: dataDe()
6195: dataMais()
6196: dataBR()
6197: diasEntre()
6198: isoSP()
6199: pixPeriodo()
6206: pixDesc()
6207: pixDiasPeriodo()
6212: marcarAjustesPorVenc()
6217: pixDatasNovo()
6226: pixDatasMudou()
6237: pixAluguelProporcional()
6245: pixPeriodoInfo()
6258: pixAddLinha()
6265: pixLinhas()
6267: descSoma()
6277: calcNewPix()
6286: **RECIBO DE PAGAMENTO**
6290: receiptValue()
6291: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
6292: atrasoDados()
6299: cobrarAtraso()
6315: allocatePix()
6334: reciboData()
6357: fmtDateTimeBR()
6358: reciboTexto()
6409: openRecibo()
6426: closeRecibo()
6427: **CORRIGIR RECIBO**
6429: corrigirLinhaHtml()
6439: openCorrigirRecibo()
6462: closeCorrigirRecibo()
6463: corrigirLer()
6469: corrigirSoma()
6476: salvarCorrigirRecibo()
6493: copyRecibo()
6498: reciboCanvas()
6515: reciboPdfBlob()
6533: shareReciboPdf()
6549: rotularTabelas()
6567: areaAberta()
6568: markAreas()
6578: closeAreas()
6582: toggleArea()
6590: dobraSalva()
6591: setDobra()
6596: toggleDobra()
6603: dobraTopo()
6610: renderMasterResumo()
6624: renderMasterTopo()
6646: loadIA()
6668: updateIABadge()
6673: loadIASetting()
6679: paintIASwitch()
6685: toggleIA()
6692: loadRobo()
6701: iaPrepararQr()
6706: paintRobo()
6735: pedirCodigoRobo()
6744: toggleRobo()
6759: iaTodosGerar()
6777: iaTodosCancelar()
6781: iaTodosConfirmar()
6795: loadIARules()
6800: iaAbrirPdf()
6806: renderIARules()
6810: saveIARules()
6815: addIARule()
6820: delIARule()
6824: openIA()
6839: closeIA()
6840: iaShow()
6841: iaPhone()
6846: renderIA()
6888: iaAprovar()
6897: iaPhone2()
6898: iaSend()
6929: iaMark()
6940: iaDelete()
6951: openPixArea()
6960: closePixArea()
6961: renderPixArea()
6997: openEditPix()
7026: deletePix()
7038: closeNewPix()
7040: saveNewPix()
7131: pushSupported()
7132: isIOS()
7133: isStandalone()
7134: b64ToBytes()
7140: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7145: notifStatus()
7153: stepsList()
7157: notifHelpHtml()
7191: renderNotifModal()
7203: checkDriverNotifications()
7236: activateFromModal()
7249: refreshNotifButton()
7268: subscribePush()
7283: enableNotifications()
7303: closeDocViewer()
7311: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
7323: allFeaturesOn()
7324: feat()
7325: loadDriverFeatures()
7332: saveDriverFeatures()
7336: drawFeatureToggles()
7351: setAllFeatures()
7362: applyDriverFeatures()
7377: **PIX: conferência do código e QR code desenhado no aparelho**
7378: crc16()
7386: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7388: pixTxt()
7389: pixCampo()
7390: pixGerarCodigo()
7400: pixAutoLigado()
7401: pixAutoMudou()
7406: gerarPixAuto()
7422: pixRecebedorCarregar()
7433: pixRecebedorGuardar()
7440: pixValid()
7446: renderPixQr()
7456: previewNewPixQr()
7466: **FOTO DO MOTORISTA (recortada da CNH)**
7467: photoPath()
7468: fileToCanvas()
7487: cropPhoto()
7501: savePhoto()
7506: photoBoxFrom()
7512: fillAvatar()
7523: fillAvatars()
7536: storedFile()
7543: photoFromCnh()
7555: **FOTO DO PERFIL ACOMPANHA A CNH**
7558: cnhStamp()
7559: photoFiles()
7567: avatarPath()
7572: syncCnhPhotos()
7596: pickImage()
7599: changeDriverPhoto()
7615: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
7617: uploadTmp()
7624: clearTmp()
7629: aiReadFiles()
7635: okDateISO()
7637: noAccents()
7639: makeUsername()
7648: titleCase()
7649: syncNewDriverAccess()
7655: setNewDriverPhoto()
7660: pickNewDriverPhoto()
7664: resetNewDriverForm()
7672: newDriverDocChosen()
7706: anoCrlv()
7707: aiReadCrlv()
7724: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7725: sendWelcomeEmail()
7731: showCredentials()
7742: demoAssistente()
7761: **PERGUNTAR À IA (ÁREA IA, só o master)**
7765: iaChatReset()
7766: iaNorm()
7767: iaAcha()
7773: iaVeicTxt()
7774: iaCamposVeic()
7775: iaDataOk()
7776: iaOpcoes()
7777: iaTodosMotoristas()
7781: iaFerramenta()
7876: renderIAChat()
7893: iaChatDica()
7894: iaChatEnviar()
7929: iaChatNota()
7930: iaCancelarCartao()
7931: iaConfirmarCartao()
7976: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7977: syncAppFinState()
7986: renderAppEarnings()
8066: saveAppEarning()
8093: workDayISO()
8094: paintDayOff()
8103: renderDayOff()
8110: setDayOff()
8120: aiReadEarning()
8153: **DESPESAS DO APLICATIVO**
8155: appExpCustomTypes()
8156: fillAppExpTypes()
8163: onAppExpTypeChange()
8168: saveAppExpense()
8193: deleteAppExpense()
8202: deleteAppEarning()
8299: loadTermsAcceptances()
8311: termsOf()
8312: currentAcceptance()
8313: needsTermsAcceptance()
8316: fmtDateTime()
8319: termsPlainText()
8323: termsHash()
8331: openTermsGate()
8354: termsGateCheck()
8362: acceptTerms()
8382: acceptanceHtml()
8393: openTermsViewer()
8411: closeTerms()
8417: downloadTermsCopy()
8438: termsBadgeMaster()
8445: termsMasterDetail()
8486: renderTermsSetupBanner()
8499: copyTermsSql()
8509: cnhExpired()
8510: cnhWaiting()
8511: onlyDigits()
8512: normName()
8514: verifyCnh()
8526: renderCnhBanner()
8544: sendNewCnh()
8592: cnhBadgeMaster()
8600: applyPendingCnh()
8608: autoReadNewCnhs()
8626: cnhPendingHtml()
8640: recheckPendingCnh()
8650: rejectPendingCnh()
8660: showContractDoc()

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

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

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

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

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

## supabase/functions/motora-push/index.ts (442 linhas)

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
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

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
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
